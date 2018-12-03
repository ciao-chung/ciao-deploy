const BaseCommand = require('../BaseCommand')
class DeleteSSL extends BaseCommand{
  async exec() {
    if(!config.sslDelete) {
      log(`Sign SSL fail: ${error}`, 'red')
      return
    }

    for(const domain of config.sslDelete) {
      await this._delete(domain)
    }

    await execAsync(`sudo service apache2 restart`)
  }

  async _delete(domain) {
    await execAsync(`sudo certbot delete --cert-name ${domain}`)
  }
}

module.exports = new DeleteSSL()