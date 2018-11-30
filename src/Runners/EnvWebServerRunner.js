const BaseRunner = require('./BaseRunner')
class EnvBaseRunner extends BaseRunner{
  async start() {
    // base
    await this.commands.env.base.exec()
    await this.commands.env.git.exec()
    await this.commands.env.php.exec()
    await this.commands.env.composer.exec()
    await this.commands.env.mysql.exec()
    await this.commands.env.phpMyAdmin.exec()

    // web server only
    await this.commands.letsEncrypt.signSSL.exec()
  }
}

module.exports = () => new EnvBaseRunner()