const { argv } = require('yargs')
const EnvWebServerRunner = require('../Runners/EnvWebServerRunner')
const EnvWebWorkSpaceRunner = require('../Runners/EnvWebWorkSpaceRunner')
const LaravelRunner = require('../Runners/LaravelRunner')
const CommandGroupRunner = require('../Runners/CommandGroupRunner')
const CustomCommandRunner = require('../Runners/CustomCommandRunner')
class BaseAction {
  constructor() {
    this.init()
  }

  async init() {
    this.args = argv
    this.runners = {
      EnvWebServerRunner,
      EnvWebWorkSpaceRunner,
      LaravelRunner,
      CommandGroupRunner,
      CustomCommandRunner,
    }
  }
}

module.exports = BaseAction