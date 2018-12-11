const BaseRunner = require('./BaseRunner')
class CommandGroupRunner extends BaseRunner{
  async start(group) {
    const groupName = group.replace(/Group/g, '')

    this.commandList = []
    const commandGroup = this.commands[groupName]
    for(const commandName in commandGroup) {
      const command = commandGroup[commandName]
      this.commandList.push({
        title: command.title,
        value: command.instance,
        subAction: commandName,
      })
    }

    this.commandList.push({
      title: 'Exit',
      value: 'exit',
    })

    const command = await this.choiceCommand()

    if(command == 'exit') {
      return
    }

    if(!command) {
      log(`Command Not Found`, 'red')
      return
    }

    command.exec()
  }

  async choiceCommand() {
    if(this.args.subAction) {
      const target =  this.commandList.find(item => item.subAction == this.args.subAction)
      return !target ? null : target.value
    }

    const response = await prompts({
      type: 'select',
      name: 'command',
      message: 'Choice Command',
      choices: this.commandList,
    })

    return response.command
  }
}

module.exports = () => new CommandGroupRunner()