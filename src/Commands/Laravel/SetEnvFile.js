const BaseCommand = require('../BaseCommand')
const SetupLaravelEnvFileService = require('../../Services/SetupLaravelEnvFile')
class LaravelSetEnvFile extends BaseCommand{
  async exec() {
    this.SetupLaravelEnvFileService = SetupLaravelEnvFileService
    const deployConfigs = config.laravelDeploy || []
    for(const deployConfig of deployConfigs) {
      await this._setEnvFile(deployConfig)
    }
  }

  async _setEnvFile(deployConfig) {
    const laravelPath = !deployConfig.laravelFolder
      ? this.resolve(deployConfig.path, deployConfig.name)
      : this.resolve(deployConfig.path, deployConfig.name, deployConfig.laravelFolder)
    const envFilePath = this.resolve(laravelPath, '.env')
    await this.SetupLaravelEnvFileService.set(deployConfig, envFilePath)
  }
}

module.exports = new LaravelSetEnvFile()