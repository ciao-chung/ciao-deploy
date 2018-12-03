const BaseCommand = require('../BaseCommand')
class DeleteDomain extends BaseCommand{
  async exec() {
    for(const domain of config.deleteDomains) {
      await this._delete(domain)
    }

    await execAsync(`sudo service apache2 restart`)
  }

  async _delete(domain) {
    await execAsync(`sudo a2dissite ${domain}`)
    await execAsync(`sudo find /etc/apache2/ -name "${domain}*.conf"`)
    await execAsync(`sudo find /etc/apache2/ -name "${domain}*.conf" -delete`)
  }
}

module.exports = new DeleteDomain()