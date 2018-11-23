const { argv } = require('yargs')
class BaseAction {
  constructor() {
    this.init()
  }

  async init() {
    this.args = argv
  }


}

module.exports = BaseAction