const BaseAction = require('./BaseAction.js')
class CustomCommand extends BaseAction{
  async start() {
    await this.runners.CustomCommandRunner().start()
  }
}

module.exports = () => new CustomCommand()