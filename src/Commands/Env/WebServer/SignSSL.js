const BaseCommand = require('../../BaseCommand')
class SignSSL extends BaseCommand{
  async exec() {
    let sslConfig
    try {
      sslConfig = config.ssl
    } catch(error) {
      log(`Sign SSL fail: ${error}`, 'red')
      return
    }

    if(typeof sslConfig.sign != 'array') {
      log(`Sign SSL fail: ${error}`, 'red')
      return
    }

    for(const domain of sslConfig.sign) {
      await this._sign(domain)
    }
  }

  async _sign(domain) {
    try {
      const email = config.ssl.email
    } catch(error) {
      log(`Sign SSL fail: ${error}`, 'red')
      return
    }

    await execAsync(`./certbot-auto --apache --redirect --keep-until-expiring --no-eff-email --agree-tos --email ${email} --domains ${domain}`, { cwd: certbotPath })
  }
}

module.exports = new SignSSL()