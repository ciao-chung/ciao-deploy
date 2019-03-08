class CloneSource {
  constructor(commandConfig) {
    this.commandConfig = commandConfig
    this.repo = this.commandConfig.deploy.source.repo
    this.branch = this.commandConfig.deploy.source.branch || 'master'
  }

  async start(deployTempFolder, deployTempPath) {
    this.deployTempPath = deployTempPath
    this.deployTempFolder = deployTempFolder

    log(`Start clone project at ${this.repo}`)
    mkdir('-p', deployTempPath)
    try {
      await execAsync(`git clone ${this.repo} ${this.deployTempFolder}`, { cwd: process.env.PWD })
    } catch (error) {
      log(error, 'red')
      log(`Clone fail`)
      process.exit()
    }

    await execAsync(`git checkout origin/${this.branch}`, { cwd: this.deployTempPath })
  }
}

export default (commandConfig) => new CloneSource(commandConfig)