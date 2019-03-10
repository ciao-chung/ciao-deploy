import BaseCommand from 'Commands/_BaseCommand'
import { spawnSync } from 'child_process'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { env } from 'shelljs'
class MysqlDatabaseDelete extends BaseCommand{
  async setupCommand() {
    this.name = 'mysql-db-delete'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'rootPassword',
        description: 'MySQL root密碼',
        required: true,
        type: 'string',
      },
      {
        name: 'db',
        description: '資料庫名稱',
        required: true,
        type: 'string',
      },
    ]
    this.description = `MySQL刪除資料庫`
  }

  async start() {
    log(`Mysql database start delete`)
    try {
      env['MYSQL_PWD'] = this.args.rootPassword
      await execAsync(`mysql -uroot -e "DROP DATABASE IF EXISTS ${this.args.db}"`)
      await execAsync(`mysql -uroot -e "SHOW DATABASES;"`)
    } catch(error) {
      log(`MySQL資料庫刪除失敗: ${JSON.stringify(error)}`, 'red')
    }
  }
}

export default new MysqlDatabaseDelete()