import { resolve } from 'path'
import { existsSync } from 'fs'
import QueueService from 'Service/QueueService.js'
class SetupExtraService {
  constructor(commandConfig, args) {
    this.commandConfig = commandConfig
    this.args = args
    this.backendConfig = this.commandConfig.deploy.target.backend
    if(!this.backendConfig) return
    this.folderName = this.backendConfig.folder || 'backend'
    this.backendPath = resolve(deployTempPath, this.folderName)
  }

  async start() {
    if(!this.backendConfig) return
    log('=====>>>>> Setup extra service', 'green')
    this.queueService = new QueueService(this.backendConfig, this.backendPath)
    await this.queueService.startService()
  }
}

export default (commandConfig, args) => new SetupExtraService(commandConfig, args)