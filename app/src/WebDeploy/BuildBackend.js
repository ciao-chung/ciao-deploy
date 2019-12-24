import { resolve } from 'path'
import { existsSync } from 'fs'
class BuildBackend {
  constructor(commandConfig) {
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

    await this.installVendor()
    await this.setupEnvFile()
    await this.dumpAutoload()
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