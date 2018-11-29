const BaseRunner = require('../BaseRunner')
class EnvBaseRunner extends BaseRunner{
  async start() {
    await this.commands.env.webserver.InstallLetsEncrypt.exec()
  }
}

module.exports = () => new EnvBaseRunner()