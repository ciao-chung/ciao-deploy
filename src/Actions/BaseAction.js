const { argv } = require('yargs')
const EnvBaseRunner = require('../Runners/Env/EnvBaseRunner')
const EnvWebServerRunner = require('../Runners/Env/EnvWebServerRunner')
class BaseAction {
  constructor() {
    this.init()
  }

  async init() {
    this.args = argv
    this.runners = {
      EnvBaseRunner,
      EnvWebServerRunner,
    }
  }
}

module.exports = BaseAction