const { argv } = require('yargs')
const EnvWebServerRunner = require('../Runners/EnvWebServerRunner')
const LaravelRunner = require('../Runners/LaravelRunner')
const CommandGroupRunner = require('../Runners/CommandGroupRunner')
class BaseAction {
  constructor() {
    this.init()
  }

  async init() {
    this.args = argv
    this.runners = {
      EnvWebServerRunner,
      LaravelRunner,
      CommandGroupRunner,
    }
  }
}

module.exports = BaseAction