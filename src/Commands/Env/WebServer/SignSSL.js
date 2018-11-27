const BaseCommand = require('../../BaseCommand')
class SignSSL extends BaseCommand{
  async exec() {
    try {
      config.ssl.sign
    } catch(error) {
      log(`Sign SSL fail: ${error}`, 'red')
      return
    }

    log(config.ssl)

    for(const domain of config.ssl.sign) {
      await this._sign(domain)
    }
  }

  async _sign(domain) {
    try {
      config.ssl.email
    } catch(error) {
      log(`Sign SSL fail: ${error}`, 'red')
      return
    }

    await execAsync(`sudo certbot --apache --redirect --keep-until-expiring --no-eff-email --agree-tos --email ${config.ssl.email} --domains ${domain}`, { cwd: certbotPath })
  }
}

module.exports = new SignSSL()