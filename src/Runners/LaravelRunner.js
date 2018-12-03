const BaseRunner = require('./BaseRunner')
class LaravelRunner extends BaseRunner{
  async initProject() {
    await this.commands.laravel.init.instance.exec()
  }

  async deploy() {
    await this.commands.laravel.deploy.instance.exec()
  }
}

module.exports = () => new LaravelRunner()