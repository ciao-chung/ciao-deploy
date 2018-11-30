const BaseRunner = require('./BaseRunner')
class EnvFishRunner extends BaseRunner{
  async install() {
    await this.commands.fish.install.instance.exec()
  }

  async setup() {
    await this.commands.fish.setupConfig.instance.exec()
  }
}

module.exports = () => new EnvFishRunner()