class CleanTemp {
  constructor(commandConfig) {
    this.commandConfig = commandConfig
  }

  async start() {
    await execAsync(`rm -rf ${deployTempPath}`, { cwd: process.env.PWD })
  }
}

export default (commandConfig) => new CleanTemp(commandConfig)