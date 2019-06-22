import BaseCommand from 'Commands/_BaseCommand'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { readdirSync } from 'fs'
class BackupDB extends BaseCommand{
  async setupCommand() {
    this.name = 'backup-db'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'username',
        description: '使用者帳號',
        required: true,
        type: 'string',
      },
      {
        name: 'password',
        description: '使用者密碼',
        required: true,
        type: 'string',
      },
      {
        name: 'db',
        description: '資料庫',
        required: true,
        type: 'array',
      },
      {
        name: 'repo',
        description: 'Git Repo',
        required: true,
        type: 'string',
      },
    ]
    this.description = `透過git備份資料庫`
  }

  async start() {
    log(`Start backup MySQL Database`)
    try {
      await this.initDeployTempFolder()
      await this.removeOverLimitFiles()
      await this.dumpDb()
      await this.backup()
      log(`Backup MySQL Database successfully`)
    } catch (error) {
      log(`[Backup fail]`, 'yellow')
      log(`${error}`, 'yellow')
    }
    await this.cleanTempFolder()
  }

  async initDeployTempFolder() {
    // 建立佈署的暫存資料夾名稱、路徑
    this.current = now('YYYYMMDD_HHmmss')
    this.deployTempFolder = `db-${now('YYYYMMDDHHmmss')}`
    this.deployTempPath = resolve(process.env.PWD, this.deployTempFolder)
    mkdir('-p', this.deployTempPath)
    await execAsync(`git clone ${this.args.repo} backup`, { cwd: this.deployTempPath })
  }

  // 移除過多檔案避免浪費流量
  async removeOverLimitFiles() {
    const maxFileQuantity = this.args.max || 7
    const backupFolderPath = resolve(this.deployTempPath, 'backup')
    const files = readdirSync(backupFolderPath)
      .filter(file => file != '.git')
      .reverse()

    // 沒超過檔案限制
    if(files.length < maxFileQuantity) return

    for(const index in files) {
      const file = files[index]
      const fileIndex = parseInt(index)+1
      if(fileIndex < maxFileQuantity) continue
      const folderFullPath = resolve(backupFolderPath, file)
      log(`正在刪除過期備份: ${file}`, 'yellow')
      await execAsync(`rm -r ${folderFullPath}`, { cwd: backupFolderPath })
    }
  }

  async dumpDb() {
    this.storePath = resolve(this.deployTempPath, 'backup', this.current)
    mkdir('-p', this.storePath)
    for(const db of this.args.db) {
      log(`正在dump資料庫${db}`, 'yellow')
      await execAsync(`mysqldump -u ${this.args.username} -p${this.args.password} ${db} > ${db}.sql`, { cwd: this.storePath })
    }
  }

  async backup() {
    await execAsync(`git add .; git commit -am "backup ${this.current} (${this.args.db.toString()})"`, { cwd: this.storePath })
    await execAsync(`git push --force`, { cwd: this.storePath })
  }

  async cleanTempFolder() {
    await execAsync(`rm -rf ${this.deployTempPath}`, { cwd: this.deployTempPath })
  }
}

export default new BackupDB()