const BaseAction = require('./BaseAction.js')
const prettyjson = require('prettyjson')
class SetupEnv extends BaseAction{
  async start() {
    const result = prettyjson.render(config)
    console.log(result)
  }
}

module.exports = () => new SetupEnv()