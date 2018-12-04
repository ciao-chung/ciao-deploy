const BaseCommand = require('../BaseCommand')
const SignDomainService = require('../../Services/SignDomain')
class LaravelSetupDomain extends BaseCommand{
  async exec() {
    const deployConfigs = config.laravelDeploy || []
    for(const deployConfig of deployConfigs) {
      await this._setup(deployConfig)
    }
  }

  async _setup(deployConfig) {
    const laravelPath = !deployConfig.laravelFolder
      ? this.resolve(deployConfig.path, deployConfig.name)
      : this.resolve(deployConfig.path, deployConfig.name, deployConfig.laravelFolder)

    const domain = deployConfig.domain

    if(!domain) return
    await SignDomainService.sign(domain, this.resolve(laravelPath, 'public'))

    if(deployConfig.ssl != true) return
    await execAsync(`sudo certbot --apache --redirect --keep-until-expiring --no-eff-email --agree-tos --email ${config.sslNotificationEmail} --domains ${domain}` )
  }

}

module.exports = new LaravelSetupDomain()