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
      await this._cloneIfNotExist(deployConfig)
      await this._createEnvFileIfNotExist(laravelPath)
      await execAsync(`composer install`, { cwd: laravelPath })
      await execAsync(`php artisan key:generate`, { cwd: laravelPath })
      await execAsync(`php artisan storage:link`, { cwd: laravelPath })
      await execAsync(`chmod 755 -R ./`, { cwd: laravelPath })
      await this._createSymbolicLinkIfNotExist(laravelPath)
      await execAsync(`git config core.filemode false`, { cwd: laravelPath })
    } catch(error) {
      log(`Laravel init ${deployConfig.name} fail: ${error}`)
    }
  }

  async _cloneIfNotExist(deployConfig) {
    const projectExist = this.existsSync(this.resolve(deployConfig.path, deployConfig.name))
    if(projectExist) {
      return
    }

    await execAsync(`git clone ${deployConfig.repo} ${deployConfig.name}`, { cwd: deployConfig.path })
  }

  async _createEnvFileIfNotExist(laravelPath) {
    const envExist = this.existsSync(this.resolve(laravelPath, '.env'))
    if(envExist) {
      return
    }

    await execAsync(`cp .env.example .env`, { cwd: laravelPath })
  }

  async _createSymbolicLinkIfNotExist(laravelPath) {
    if(this.resolve(laravelPath, 'public/storage')) {
      return
    }

    await execAsync(`chmod -R o+w ./storage`, { cwd: laravelPath })
  }
}

module.exports = new LaravelInit()