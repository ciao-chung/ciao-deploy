const BaseRunner = require('../BaseRunner')
class EnvBaseRunner extends BaseRunner{
  async start() {
    await this.commands.env.InstallFishShell.exec()
    await this.commands.env.InstallGit.exec()
    await this.commands.env.InstallPhp.exec()
    await this.commands.env.InstallComposer.exec()
  }
}

module.exports = () => new EnvBaseRunner()