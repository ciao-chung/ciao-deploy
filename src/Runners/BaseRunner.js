const InstallGit = require('../Commands/Env/Git')
class BaseRunner {
  constructor() {
    this.init()
  }

  async init() {
    this.commands = {
      env: {
        installGit: InstallGit,
      }
    }
  }

  async start() {
    // TODO
  }
}

module.exports = BaseRunner