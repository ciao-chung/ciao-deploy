const BaseRunner = require('../BaseRunner')
class EnvBaseRunner extends BaseRunner{
  async start() {
    await this.commands.env.webserver.InstallLetsEncrypt.exec()
    await this.commands.env.webserver.SignDomain.exec()
  }
}

module.exports = () => new EnvBaseRunner()