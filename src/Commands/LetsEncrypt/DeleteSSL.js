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

    try {
      await this._removeApacheDomainSSLRedirect(domain)
    } catch(error) {
      log(`Remote Apache Domain SSL Redirect fail: ${error}`, 'red')
      return
    }
  }

  async _removeApacheDomainSSLRedirect(domain) {
    const apacheDomainConfigFilePath = this.resolve(`/etc/apache2/sites-available/${domain}.conf`)
    const apacheDomainConfigContent = this.readFileSync(apacheDomainConfigFilePath, 'utf8')
    if(!apacheDomainConfigContent) return
    const eachLine = apacheDomainConfigContent.split('/n')
    let result = ''
    for(const line of eachLine) {
      if(new RegExp(`RewriteEngine`, 'g').test(line)) continue
      if(new RegExp(`RewriteCond`, 'g').test(line)) continue
      if(new RegExp(`RewriteRule`, 'g').test(line)) continue
      result += `${line}\n`
    }

    await this.writeFileSync(apacheDomainConfigFilePath, result, 'utf8')
  }
}

module.exports = new DeleteSSL()