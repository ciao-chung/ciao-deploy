const BaseRunner = require('../BaseRunner')
class EnvBaseRunner extends BaseRunner{
  async start() {
    await this.commands.env.InstallBase.exec()
    await this.commands.env.InstallGit.exec()
    await this.commands.env.InstallPhp.exec()
    await this.commands.env.InstallComposer.exec()
    await this.commands.env.InstallMySql.exec()
    await this.commands.env.MySqlCreateUser.exec()
    await this.commands.env.InstallPhpMyAdmin.exec()
  }
}

module.exports = () => new EnvBaseRunner()