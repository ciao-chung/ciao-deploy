const BaseRunner = require('./BaseRunner')
class CustomCommandRunner extends BaseRunner{
  async start() {
    this.customCommands = config.commands
    if(!Array.isArray(this.customCommands)) {
      log(`Commands property which in config should be array type`)
      return
    }

    for(const commandConfig of this.customCommands) {
      await this._excuteCustomCommand(commandConfig)
    }
  }

  async _excuteCustomCommand(commandConfig) {
    log(`${commandConfig.description}`, 'yellow')
    try {
      await execAsync(commandConfig.command, { cwd: commandConfig.cwd })
    } catch(error) {
      const errorMessage = typeof error == 'array' || typeof error == 'object'
        ? JSON.stringify(error)
        : error
      log(`Execute fail: ${errorMessage}`, 'red')
    }
  }

}

module.exports = () => new CustomCommandRunner()