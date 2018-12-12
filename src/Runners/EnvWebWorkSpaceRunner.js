const BaseRunner = require('./BaseRunner')
class EnvWebWorkSpaceRunner extends BaseRunner{
  async start() {
    // base
    await this.commands.env.base.instance.exec()
    await this.commands.env.git.instance.exec()
    await this.commands.env.php.instance.exec()
    await this.commands.env.composer.instance.exec()
    await this.commands.mysql.install.instance.exec()
    await this.commands.env.phpMyAdmin.instance.exec()

    // work space only
    await this.commands.workspace.base.instance.exec()
    await this.commands.workspace.createDesktopSoftLink.instance.exec()
    await this.commands.workspace.chrome.instance.exec()
    await this.commands.workspace.dophin.instance.exec()
    await this.commands.workspace.media.instance.exec()
    await this.commands.workspace.ngrok.instance.exec()
    await this.commands.workspace.phpstrom.instance.exec()
    await this.commands.workspace.record.instance.exec()
    await this.commands.workspace.unetbootin.instance.exec()
  }
}

module.exports = () => new EnvWebWorkSpaceRunner()