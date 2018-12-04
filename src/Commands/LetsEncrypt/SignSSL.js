const BaseCommand = require('../BaseCommand')
class SignSSL extends BaseCommand{
  async exec() {
    if(!config.sslSignDomains) {
      log(`Sign SSL fail: ${error}`, 'red')
      return
    }

    for(const domain of config.sslSignDomains) {
      await this._sign(domain)
    }
  }

  async _sign(domain) {
    if(!config.sslNotificationEmail) {
      log(`Sign SSL fail: ${error}`, 'red')
      return
    }

    await execAsync(`sudo certbot --apache --redirect --keep-until-expiring --no-eff-email --agree-tos --email ${config.sslNotificationEmail} --domains ${domain}` )
  }
}

module.exports = new SignSSL()