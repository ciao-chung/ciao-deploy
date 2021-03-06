import { resolve } from 'path'
import { existsSync } from 'fs'
import QueueService from 'Service/QueueService.js'
class BuildBackend {
  constructor(commandConfig) {
    this.args = args
    this.commandConfig = commandConfig
    this.backendConfig = this.commandConfig.deploy.target.backend
    this.deployBackend = !!this.backendConfig
    if(!this.deployBackend) return

    this.folderName = this.backendConfig.folder || 'Backend'
    this.backendPath = resolve(deployTempPath, this.folderName)
  }

  async executeRemote(command, options = {}) {
    const user = this.backendConfig.user
    const host = this.backendConfig.host
    await executeRemote(user, host, command, options)
  }

  async start() {
    if(!this.deployBackend) return
    log(`Start build backend`)
    await execAsync(`git log -1 --pretty="%H %BAuthor: %aN, Date: %ai" > deploy.commit`, { cwd: this.backendPath })
    await this.installVendor()
    await this.setupEnvFile()
    await this.dumpAutoload()
    this.queueService = new QueueService(this.backendConfig, this.backendPath)
    await this.queueService.setupConfigFile()
    if(this.args.buildOnlyPath) {
      log(`=====>>>>> copy to build only path`, 'green')
      await execAsync(`mkdir -p ${this.args.buildOnlyPath}`)
      await execAsync(`cp -r ${this.backendPath} ${this.args.buildOnlyPath}`)
    }
    notify('backend build successfully')
  }

  async installVendor() {
    await execAsync(`composer install`, { cwd: this.backendPath })
  }

  async setupEnvFile() {
    if(typeof this.backendConfig.env != 'object') return

    const hasEnvFile = existsSync(resolve(this.backendPath, '.env'))
    if(!hasEnvFile) await execAsync(`cp .env.example .env`, { cwd: this.backendPath })

    for(const key in this.backendConfig.env) {
      const value = this.backendConfig.env[key]
      await execAsync(`php artisan env:set ${key} ${value} --quiet`, { cwd: this.backendPath }, true)
    }
  }

  async dumpAutoload() {
    await execAsync(`composer dump-autoload`, { cwd: this.backendPath })
  }
}

export default (commandConfig) => new BuildBackend(commandConfig)