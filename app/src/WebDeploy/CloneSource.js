class CloneSource {
  constructor(commandConfig) {
    this.commandConfig = commandConfig
    this.repo = this.commandConfig.deploy.source.repo
    this.branch = this.commandConfig.deploy.source.branch || 'master'
  }

  async start() {
    log(`Start clone project at ${this.repo}`)
    mkdir('-p', deployTempPath)
    try {
      await execAsync(`git clone ${this.repo} ${deployTempFolder}`, { cwd: process.env.PWD })
    } catch (error) {
      log(error, 'red')
      log(`Clone fail`)
      process.exit()
    }

    await execAsync(`git checkout origin/${this.branch}`, { cwd: deployTempPath })
  }
}

export default (commandConfig) => new CloneSource(commandConfig)