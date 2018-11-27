const BaseRunner = require('../BaseRunner')
class EnvFishRunner extends BaseRunner{
  async start() {
    await this.commands.env.InstallFishShell.exec()
  }
}

module.exports = () => new EnvFishRunner()