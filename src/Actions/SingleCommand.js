const BaseAction = require('./BaseAction.js')
class SetupEnv extends BaseAction{
  async start() {
    await this.runners.SingleCommandRunner().start()
  }
}

module.exports = () => new SetupEnv()