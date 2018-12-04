const BaseCommand = require('../BaseCommand')
class LaravelDeploy extends BaseCommand{
  async exec() {
    const deployConfigs = config.laravelDeploy || []
    for(const deployConfig of deployConfigs) {
      await this._deploy(deployConfig)
    }
  }

  async _deploy(deployConfig) {
    const laravelPath = !deployConfig.laravelFolder
      ? this.resolve(deployConfig.path, deployConfig.name)
      : this.resolve(deployConfig.path, deployConfig.name, deployConfig.laravelFolder)

    await execAsync(`git checkout master`, { cwd: laravelPath })
    await execAsync(`git pull`, { cwd: laravelPath })
    if(deployConfig.branch) await execAsync(`git checkout ${deployConfig.branch}`, { cwd: laravelPath })
    if(deployConfig.commit) await execAsync(`git checkout ${deployConfig.commit}`, { cwd: laravelPath })
    if(deployConfig.migrate != false) await execAsync(`php artisan migrate`, { cwd: laravelPath })
  }
}

module.exports = new LaravelDeploy()