const BaseCommand = require('../BaseCommand')
class LaravelDeploy extends BaseCommand{
  async exec() {
    log('deploy')
  }
}

module.exports = new LaravelDeploy()