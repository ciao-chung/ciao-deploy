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
  }

  async initBackend() {
    if(!this.args.first) return
    if(!this.backendConfig) return
    await this.executeRemoteBackend(`cd ${this.backendConfig.path}; php artisan storage:link`)
    await this.executeRemoteBackend(`cd ${this.backendConfig.path}; php artisan key:generate`)
  }
  
  async executeRemoteBackend(command, options) {
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
    await this.executeRemoteBackend(`cd ${this.backendConfig.path}; php artisan config:clear`)
    await this.executeRemoteBackend(`cd ${this.backendConfig.path}; php artisan route:clear`)
    try {
      await this.executeRemoteBackend(`cd ${this.backendConfig.path}; php artisan config:cache`)
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
}

export default (commandConfig, args) => new AfterRsync(commandConfig, args)