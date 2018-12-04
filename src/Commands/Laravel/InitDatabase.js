const BaseCommand = require('../BaseCommand')
class LaravelInitDatabase extends BaseCommand{
  async exec() {
    const deployConfigs = config.laravelDeploy || []
    for(const deployConfig of deployConfigs) {
      await this._init(deployConfig)
    }
  }

  async _init(deployConfig) {
    const laravelPath = !deployConfig.laravelFolder
      ? this.resolve(deployConfig.path, deployConfig.name)
      : this.resolve(deployConfig.path, deployConfig.name, deployConfig.laravelFolder)

    try {
      await execAsync(`php artisan cube:init-site --force`, { cwd: laravelPath })
    } catch(error) {
      log(`Project [${deployConfig.name}] Init fail: ${error}`, 'red')
    }
  }
}

module.exports = new LaravelInitDatabase()