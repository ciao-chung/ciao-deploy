const BaseAction = require('./BaseAction.js')
class CommandGroup extends BaseAction{
  async start(group) {
    await this.runners.CommandGroupRunner().start(group)
  }
}

module.exports = () => new CommandGroup()