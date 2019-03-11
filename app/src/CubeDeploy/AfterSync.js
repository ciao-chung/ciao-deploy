class AfterSync {
  constructor(commandConfig) {
    this.commandConfig = commandConfig
    this.frontendConfig = this.commandConfig.deploy.target.frontend
    this.backendConfig = this.commandConfig.deploy.target.backend
  }

  async start() {
    await this.cleanBackendCache()
    await this.migrate()
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

export default (commandConfig) => new AfterSync(commandConfig)