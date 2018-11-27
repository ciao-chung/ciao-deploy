const BaseCommand = require('../../BaseCommand')
class SignDomain extends BaseCommand{
  async exec() {
    let domains
    try {
      domains = config.domains
    } catch(error) {
      log(`Sign domain fail: ${error}`, 'red')
      return
    }

    if(typeof domains != 'array') {
      log(`Sign domain fail: ${error}`, 'red')
      return
    }

    for(const domain in domains) {
      const config = domains[domain]
      await this._sign(domain, config)
    }
  }

  async _sign(domain, config) {
    const configContent = this._getDomainConfig(domain, config.path)
    const configFilePath = this.resolve(__dirname, `${domain}.conf`)
    log(`Start sign domain: ${domain}`, 'green')
    await this.writeFileSync(configFilePath, configContent, 'utf-8')
    await execAsync(`sudo mv ${configFilePath} /etc/apache2/sites-available/`)
    await execAsync(`sudo a2ensite ${domain}`)
    await execAsync(`sudo service apache2 restart`)

    if(!config.ssl) return
    try {
      const email = config.ssl.email
    } catch(error) {
      log(`Sign SSL fail: ${error}`, 'red')
      return
    }
    await execAsync(`./certbot-auto --apache --redirect --keep-until-expiring --no-eff-email --agree-tos --email ${email} --domains ${domain}`, { cwd: certbotPath })
  }

  async _getDomainConfig(domain, path) {
    return `
<VirtualHost *:80>
    ServerName ${domain}
    ServerAlias www.${domain}
    DocumentRoot ${path}
    ErrorLog $${APACHE_LOG_DIR}/error.log
    CustomLog $${APACHE_LOG_DIR}/access.log combined

        <Directory ${path}/>
                Options Indexes FollowSymLinks MultiViews
                AllowOverride All
                Order allow,deny
                allow from all
		Require all granted
        </Directory>
</VirtualHost>
`
  }
}

module.exports = new SignDomain()