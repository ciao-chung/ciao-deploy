const InstallFishShell = require('../Commands/Env/FishShell')
const InstallGit = require('../Commands/Env/Git')
const InstallPhp = require('../Commands/Env/Php')
const InstallComposer = require('../Commands/Env/Composer')
class BaseRunner {
  constructor() {
    this.init()
  }

  async init() {
    this.commands = {
      env: {
        InstallFishShell,
        InstallGit,
        InstallPhp,
        InstallComposer,
      }
    }
  }

  async start() {
    // TODO
  }
}

module.exports = BaseRunner