const BaseRunner = require('./BaseRunner')
class LaravelRunner extends BaseRunner{
  async initProject() {
    await this.commands.mysql.createDB.instance.exec()
    await this.commands.laravel.init.instance.exec()
    await this.commands.laravel.setEnvFile.instance.exec()
    await this.commands.laravel.initDatabase.instance.exec()
    await this.commands.laravel.setupDomain.instance.exec()
  }

  async deploy() {
    await this.commands.laravel.deploy.instance.exec()
  }

  async initAllInOne() {
    await this.initProject()
    await this.deploy()
    await this.commands.apache.signDomain.instance.exec()
    await this.commands.letsEncrypt.signSSL.instance.exec()
  }
}

module.exports = () => new LaravelRunner()