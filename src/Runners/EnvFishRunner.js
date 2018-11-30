const BaseRunner = require('./BaseRunner')
class EnvFishRunner extends BaseRunner{
  async install() {
    await this.commands.fish.install.exec()
  }

  async setup() {
    await this.commands.fish.setupConfig.exec()
  }
}

module.exports = () => new EnvFishRunner()