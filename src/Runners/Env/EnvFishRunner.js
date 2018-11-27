const BaseRunner = require('../BaseRunner')
class EnvFishRunner extends BaseRunner{
  async install() {
    await this.commands.env.InstallFishShell.exec()
  }

  async setup() {
    await this.commands.env.FishShellSetup.exec()
  }
}

module.exports = () => new EnvFishRunner()