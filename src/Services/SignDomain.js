const { resolve } = require('path')
const { existsSync, writeFileSync } = require('fs')
class SignDomain {
  async sign(domain, webPath) {
    if(!existsSync(webPath)) {
      log(`Sign domain fail cuz web path not found`, 'red')
      return
    }

    const configContent = this._getDomainConfig(domain, webPath)
    const configFilePath = resolve('/tmp', `${domain}.conf`)
    log(`Start sign domain: ${domain}`, 'green')
    await writeFileSync(configFilePath, configContent, 'utf8')
    await execAsync(`sudo mv ${configFilePath} /etc/apache2/sites-available/`)
    await execAsync(`sudo a2ensite ${domain}`)
    await execAsync(`sudo service apache2 restart`)
  }

  _getDomainConfig(domain, path) {
    return `
<VirtualHost *:80>
    ServerName ${domain}
    ServerAlias www.${domain}
    DocumentRoot ${path}
    ErrorLog $\{APACHE_LOG_DIR\}/error.log
    CustomLog $\{APACHE_LOG_DIR\}/access.log combined
    
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