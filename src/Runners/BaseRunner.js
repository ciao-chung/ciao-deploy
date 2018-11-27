const InstallBase = require('../Commands/Env/Base')
const InstallFishShell = require('../Commands/Env/FishShell')
const InstallGit = require('../Commands/Env/Git')
const InstallPhp = require('../Commands/Env/Php')
const InstallComposer = require('../Commands/Env/Composer')
const InstallMySql = require('../Commands/Env/MySql')
const MySqlCreateUser = require('../Commands/Env/MySqlCreateUser')
const InstallPhpMyAdmin = require('../Commands/Env/PhpMyAdmin')
const InstallLetsEncrypt = require('../Commands/Env/WebServer/LetsEncrypt')
class BaseRunner {
  constructor() {
    this.init()
  }

  async init() {
    this.commands = {
      env: {
        InstallBase,
        InstallFishShell,
        InstallGit,
        InstallPhp,
        InstallComposer,
        InstallMySql,
        MySqlCreateUser,
        InstallPhpMyAdmin,
        InstallLetsEncrypt,
      },
    }
  }

  async start() {
    // TODO
  }
}

module.exports = BaseRunner