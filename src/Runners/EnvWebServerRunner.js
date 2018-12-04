const BaseRunner = require('./BaseRunner')
class EnvWebServerRunner extends BaseRunner{
  async start() {
    // base
    await this.commands.env.base.instance.exec()
    await this.commands.env.git.instance.exec()
    await this.commands.env.php.instance.exec()
    await this.commands.env.composer.instance.exec()
    await this.commands.env.phpMyAdmin.instance.exec()
    await this.commands.mysql.install.instance.exec()

    // web server only
    await this.commands.letsEncrypt.install.instance.exec()
  }
}

module.exports = () => new EnvWebServerRunner()