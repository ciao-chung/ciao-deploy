const BaseCommand = require('../BaseCommand')
class LaravelInit extends BaseCommand{
  async exec() {
    const deployConfigs = config.laravelDeploy || []
    for(const deployConfig of deployConfigs) {
      await this._deploy(deployConfig)
    }
  }

  async _deploy(deployConfig) {
    log(`Start deploy ${deployConfig.name}`)

    const laravelPath = !deployConfig.laravelFolder
      ? this.resolve(deployConfig.path, deployConfig.name)
      : this.resolve(deployConfig.path, deployConfig.name, deployConfig.laravelFolder)

    mkdir(deployConfig.path)
    try {
      await execAsync(`git clone ${deployConfig.repo} ${deployConfig.name}`, { cwd: deployConfig.path })
      await execAsync(`cp .env.example .env`, { cwd: laravelPath })
      await execAsync(`composer install`, { cwd: laravelPath })
      await execAsync(`php artisan key:generate`, { cwd: laravelPath })
      await execAsync(`php artisan storage:link`, { cwd: laravelPath })
      await execAsync(`chmod 755 -R ./`, { cwd: laravelPath })
      await execAsync(`chmod -R o+w ./storage`, { cwd: laravelPath })
      await execAsync(`git config core.filemode false`, { cwd: laravelPath })
    } catch(error) {
      log(`Laravel init ${deployConfig.name} fail: ${error}`)
    }
  }
}

module.exports = new LaravelInit()