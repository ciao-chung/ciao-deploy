const { argv } = require('yargs')
const EnvFishRunner = require('../Runners/Env/EnvFishRunner')
const EnvBaseRunner = require('../Runners/Env/EnvBaseRunner')
const EnvWebServerRunner = require('../Runners/Env/EnvWebServerRunner')
const SingleCommandRunner = require('../Runners/SingleCommandRunner')
class BaseAction {
  constructor() {
    this.init()
  }

  async init() {
    this.args = argv
    this.runners = {
      EnvFishRunner,
      EnvBaseRunner,
      EnvWebServerRunner,
      SingleCommandRunner,
    }
  }
}

module.exports = BaseAction