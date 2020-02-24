import { resolve } from 'path'
import { existsSync, writeFileSync } from 'fs'
class AfterRsync {
  constructor(commandConfig, args) {
    this.commandConfig = commandConfig
    this.args = args
    this.frontendConfig = this.commandConfig.deploy.target.frontend
    this.backendConfig = this.commandConfig.deploy.target.backend
  }

  async start() {
    await this.initBackend()
    await this.cleanBackendCache()
    await this.migrate()
    await this.setupFolderPermission()
    await this.cleanBackendCache()
    await this.cleanupCronJob()
    await this.setupCronJob()
  }

  async initBackend() {
    if(!this.args.first) return
    if(!this.backendConfig) return
    await this.executeRemoteBackend(`cd ${this.backendConfig.path}; php artisan storage:link`)
    await this.executeRemoteBackend(`cd ${this.backendConfig.path}; php artisan key:generate`)
  }
  
  async executeRemoteBackend(command, options) {
    if(this.backendConfig.local) {
      await execAsync(command, options)
      return
    }
    await executeRemote(this.backendConfig.user, this.backendConfig.host, command, options)
  }

  async setupFolderPermission() {
    if(!this.backendConfig) return
    log(`正在設定後端資料夾檔案權限: ${this.backendConfig.path}`)
    await this.executeRemoteBackend(`cd ${this.backendConfig.path}; sudo chmod 755 -R ${this.backendConfig.path}`)
    await this.executeRemoteBackend(`cd ${this.backendConfig.path}; sudo chmod -R o+w ${this.backendConfig.path}/storage`)
  }

  async cleanBackendCache() {
    if(!this.backendConfig) return
    try {
      await this.executeRemoteBackend(`cd ${this.backendConfig.path}; php artisan cache:clear`)
    } catch(error) {
      log(error, 'yellow')
    }
    
    try {
      await this.executeRemoteBackend(`cd ${this.backendConfig.path}; php artisan config:clear`)
      await this.executeRemoteBackend(`cd ${this.backendConfig.path}; php artisan route:clear`)
    } catch(error) {
      log(error, 'yellow')
    }

    try {
      await this.executeRemoteBackend(`cd ${this.backendConfig.path}; php artisan route:cache`)
    } catch(error) {
      log(error, 'yellow')
    }
  }

  async migrate() {
    if(!this.backendConfig) return
    if(!this.backendConfig.migrate) return
    try {
      await this.executeRemoteBackend(`cd ${this.backendConfig.path}; php artisan migrate`)
    } catch(error) {
      log(error, 'yellow')
    }
  }

  async cleanupCronJob() {
    if(!this.backendConfig) return
    const cron = this.backendConfig.cron
    if(!cron) return
    if(!cron.name) return

    const cronPath = `/etc/cron.d/${cron.name}`
    const hasExistCron = existsSync(cronPath)
    if(!hasExistCron) return

    try {
      await existsSync()
      await this.executeRemoteBackend(`sudo rm -rf ${cronPath}`)
      await this.executeRemoteBackend(`sudo service cron restart`)
    } catch(error) {
      log(error, 'yellow')
    }
  }

  async setupCronJob() {
    if(!this.backendConfig) return
    const cron = this.backendConfig.cron
    if(!cron) return
    if(!cron.user || !cron.name) return
    const cronJobContent = `* * * * * ${cron.user} cd ${this.backendConfig.path} && php artisan schedule:run >> /dev/null 2>&1`
    const cronJobConfigFilePath = `${this.backendConfig.path}/cron`
    await this.executeRemoteBackend(`echo '${cronJobContent}' > ${cronJobConfigFilePath}`)
    try {
      await this.executeRemoteBackend(`sudo mv ${cronJobConfigFilePath} /etc/cron.d/${cron.name}`)
      await this.executeRemoteBackend(`sudo chown root:root /etc/cron.d/${cron.name}`)
      await this.executeRemoteBackend(`sudo service cron restart`)
    } catch(error) {
      log(error, 'yellow')
    }
  }
}

export default (commandConfig, args) => new AfterRsync(commandConfig, args)