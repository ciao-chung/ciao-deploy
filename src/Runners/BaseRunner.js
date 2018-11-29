const InstallBase = require('../Commands/Env/Base')
const InstallFishShell = require('../Commands/Env/FishShell')
const FishShellSetup = require('../Commands/Env/FishShellSetup')
const InstallGit = require('../Commands/Env/Git')
const InstallPhp = require('../Commands/Env/Php')
const InstallComposer = require('../Commands/Env/Composer')
const InstallMySql = require('../Commands/Env/MySql')
const MySqlCreateUser = require('../Commands/Env/MySqlCreateUser')
const MySqlDeleteUser = require('../Commands/Env/MySqlDeleteUser')
const InstallPhpMyAdmin = require('../Commands/Env/PhpMyAdmin')
const InstallLetsEncrypt = require('../Commands/Env/WebServer/LetsEncrypt')
const SignDomain = require('../Commands/Env/WebServer/SignDomain')
const SignSSL = require('../Commands/Env/WebServer/SignSSL')
class BaseRunner {
  constructor() {
    this.init()
  }

  async init() {
    this.commands = {
      env: {
        InstallBase,
        InstallFishShell,
        FishShellSetup,
        InstallGit,
        InstallPhp,
        InstallComposer,
        InstallMySql,
        MySqlCreateUser,
        MySqlDeleteUser,
        InstallPhpMyAdmin,
        webserver: {
          InstallLetsEncrypt,
          SignDomain,
          SignSSL,
        }
      },
    }
  }

  async start() {
    // TODO
  }
}

module.exports = BaseRunner