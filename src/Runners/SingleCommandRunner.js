const BaseRunner = require('./BaseRunner')
class SingleCommandRunner extends BaseRunner{
  async start() {
    let commandList = []
    for(const commandGroupName in this.commands) {
      const commandGroup = this.commands[commandGroupName]
      for(const commandName in commandGroup) {
        const command = commandGroup[commandName]
        commandList.push({
          title: command.title,
          value: command.instance,
        })
      }
    }

    commandList.push({
      title: 'Exit',
      value: 'exit',
    })

    const response = await prompts({
      type: 'select',
      name: 'command',
      message: 'Choice Command',
      choices: commandList,
    })

    if(response.command == 'exit') {
      return
    }

    if(!response.command) {
      log(`Command Not Found`, 'red')
      return
    }

    response.command.exec()
  }
}

module.exports = () => new SingleCommandRunner()