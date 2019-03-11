class AfterRsync {
  constructor(commandConfig, args) {
    this.commandConfig = commandConfig
    this.args = args
    this.frontendConfig = this.commandConfig.deploy.target.frontend
    this.backendConfig = this.commandConfig.deploy.target.backend
  }

  async start() {
    await this.initBackend()
    await this.setupFolderPermission()
    await this.cleanBackendCache()
    await this.migrate()
  }

  async initBackend() {
    if(!this.args.first) return
    await executeRemote(`cd ${this.backendConfig.path}; storage:link`)
  }

  async setupFolderPermission() {
    await executeRemote(`cd ${this.backendConfig.path}; chmod 755 -R ${this.backendConfig.path}`)
    await executeRemote(`cd ${this.backendConfig.path}; chmod -R o+w ./storage`)
  }

  async cleanBackendCache() {
    if(!this.backendConfig) return
    await executeRemote(`cd ${this.backendConfig.path}; php artisan cache:clear`)
    await executeRemote(`cd ${this.backendConfig.path}; php artisan config:clear`)
  }

  async migrate() {
    if(!this.backendConfig) return
    if(!this.backendConfig.migrate) return
    await executeRemote(`cd ${this.backendConfig.path}; php artisan migrate`)
  }
}

export default (commandConfig, args) => new AfterRsync(commandConfig, args)