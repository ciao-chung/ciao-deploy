const { argv } = require('yargs')
const EnvFishRunner = require('../Runners/EnvFishRunner')
const EnvWebServerRunner = require('../Runners/EnvWebServerRunner')
const LaravelRunner = require('../Runners/LaravelRunner')
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
      LaravelRunner,
      SingleCommandRunner,
    }
  }
}

module.exports = BaseAction