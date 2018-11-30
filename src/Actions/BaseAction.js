const { argv } = require('yargs')
const EnvFishRunner = require('../Runners/EnvFishRunner')
const EnvWebServerRunner = require('../Runners/EnvWebServerRunner')
const SingleCommandRunner = require('../Runners/SingleCommandRunner')
class BaseAction {
  constructor() {
    this.init()
  }

  async init() {
    this.args = argv
    this.runners = {
      EnvFishRunner,
      EnvWebServerRunner,
      SingleCommandRunner,
    }
  }
}

module.exports = BaseAction