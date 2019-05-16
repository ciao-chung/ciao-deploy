import { resolve } from 'path'
class Rsync {
  constructor(commandConfig) {
    this.commandConfig = commandConfig
    this.frontendConfig = this.commandConfig.deploy.target.frontend
    this.backendConfig = this.commandConfig.deploy.target.backend
  }

  async start() {
    await this.rsyncFrontend()
    await this.rsyncBackend()
    notify('Rsync successfully')
  }

  async rsyncFrontend() {
    if(!this.frontendConfig) return
    log(`Start rsync frontend`)
    const frontendFolderName = this.frontendConfig.folder || 'Frontend'
    // 清除原本的frontend
    await executeRemote(this.frontendConfig.user, this.frontendConfig.host, `rm -rf ${this.frontendConfig.path}`)
    await this.rsyncTargetMkdir(this.frontendConfig)
    await this.rsync(
      this.frontendConfig.user,
      this.frontendConfig.host,
      resolve(deployTempPath, frontendFolderName, 'dist'),
      this.frontendConfig.path,
    )
  }

  async rsyncBackend() {
    if(!this.backendConfig) return
    log(`Start rsync backend`)
    const backendFolderName = this.backendConfig.folder || 'Backend'
    await this.rsyncTargetMkdir(this.backendConfig)
    await this.rsync(
      this.backendConfig.user,
      this.backendConfig.host,
      resolve(deployTempPath, backendFolderName),
      this.backendConfig.path,
    )
  }

  async rsync(user, host, source, target) {
    const rsyncCommand = `rsync -e "ssh -o StrictHostKeyChecking=no" -avzh ${source}/ ${user}@${host}:${target}`
    await execAsync(rsyncCommand)
  }

  async rsyncTargetMkdir(config) {
    await executeRemote(config.user, config.host, `mkdir -p ${config.path}`)
  }
}

export default (commandConfig) => new Rsync(commandConfig)