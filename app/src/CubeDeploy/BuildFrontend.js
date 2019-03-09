import { resolve } from 'path'
class BuildFrontend {
  constructor(commandConfig) {
    this.commandConfig = commandConfig
    this.frontendConfig = this.commandConfig.deploy.target.frontend
    this.deployFrontend = !!this.frontendConfig
    if(!this.deployFrontend) return

    this.folderName = this.frontendConfig.folder || 'Frontend'
    this.frontendPath = resolve(deployTempPath, this.folderName)
  }

  async executeRemote(command, options = {}) {
    const user = this.frontendConfig.user
    const host = this.frontendConfig.host
    await executeRemote(user, host, command, options)
  }

  async start() {
    if(!this.deployFrontend) return
    log(`Start build frontend`)

    await this.setupApiBase()
    await this.installNodeModules()
    await this.buildWebpack()
    await this.cleanNodeModules()
  }

  async setupApiBase() {
    const apibase = this.frontendConfig.apibase
    await execAsync(`echo '{ "apibase": "${apibase}", "env": {} }' > static/config/deploy.json`, { cwd: this.frontendPath })
    await execAsync(`echo '{ "apibase": "${apibase}" }' > static/config/apibase.json`, { cwd: this.frontendPath })
  }

  async installNodeModules() {
    await execAsync(`yarn install`, { cwd: this.frontendPath })
  }

  async buildWebpack() {
    const buildApidoc = !!this.frontendConfig.apidoc
    const apidocOnly = !!this.frontendConfig.apidoc_only
    const apidocExclude = !buildApidoc ? null : this.frontendConfig.apidoc.exclude
    
    let buildCommand = !apidocOnly
      ? `yarn build` : `yarn build-apidoc`

    if(buildApidoc) buildCommand = `${buildCommand} --doc `
    if(apidocExclude) buildCommand = `${buildCommand} --doc_exclude=${apidocExclude} `
    log(`buildCommand: ${buildCommand}`, 'yellow')
    await execAsync(buildCommand, { cwd: this.frontendPath })
  }

  async cleanNodeModules() {
    await execAsync(`rm -rf node_modules/`, { cwd: this.frontendPath })
  }
}

export default (commandConfig) => new BuildFrontend(commandConfig)