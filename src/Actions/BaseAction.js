const { argv } = require('yargs')
const EnvBaseRunner = require('../Runners/Env/EnvBaseRunner')
class BaseAction {
  constructor() {
    this.init()
  }

  async init() {
    this.args = argv
    this.runners = {
      EnvBaseRunner
    }
  }
}

module.exports = BaseAction