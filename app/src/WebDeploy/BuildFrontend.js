import { resolve } from 'path'
class BuildFrontend {
  constructor(commandConfig) {
    this.args = args
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
    await this.beforeBuild()
    await this.installNodeModules()
    await this.buildWebpack()
    await execAsync(`git log -1 --pretty="%H %BAuthor: %aN, Date: %ai" > deploy.commit`, { cwd: resolve(this.frontendPath, 'dist') })
    await this.afterBuildWebpack()
    await this.cleanNodeModules()
    if(this.args.buildOnlyPath) {
      log(`=====>>>>> copy to build only path`, 'green')
      await execAsync(`mkdir -p ${this.args.buildOnlyPath}`)
      await execAsync(`cp -r ${this.frontendPath} ${this.args.buildOnlyPath}`)
    }
    notify('Frontend build successfully')
  }

  async setupApiBase() {
    const apibase = this.frontendConfig.apibase
    if(!apibase) return
    await execAsync(`echo '{ "apibase": "${apibase}", "env": {} }' > static/config/deploy.json`, { cwd: this.frontendPath })
    await execAsync(`echo '{ "apibase": "${apibase}" }' > static/config/apibase.json`, { cwd: this.frontendPath })
  }

  async installNodeModules() {
    await execAsync(`yarn install`, { cwd: this.frontendPath })
  }

  async beforeBuild() {
    const beforeBuildCommands = this.frontendConfig.before_build
    if(!Array.isArray(beforeBuildCommands)) return
    for (const command of beforeBuildCommands) {
      await execAsync(`${command}`, { cwd: this.frontendPath })
    }
  }

  async buildWebpack() {
    const buildScript = this.frontendConfig.build_script
    log(`buildCommand: ${buildScript}`, 'yellow')
    await execAsync(buildScript, { cwd: this.frontendPath })
  }

  async afterBuildWebpack() {
    const afterBuildCommands = this.frontendConfig.after_build
    if(!Array.isArray(afterBuildCommands)) return
    for (const command of afterBuildCommands) {
      await execAsync(`${command}`, { cwd: this.frontendPath })
    }
  }

  async cleanNodeModules() {
    await execAsync(`rm -rf node_modules/`, { cwd: this.frontendPath })
  }
}

export default (commandConfig) => new BuildFrontend(commandConfig)