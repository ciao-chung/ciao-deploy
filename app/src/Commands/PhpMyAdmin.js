import BaseCommand from 'Commands/_BaseCommand'
import { appendFileSync, readFileSync } from 'fs'
class PhpMyAdmin extends BaseCommand{
  async setupCommand() {
    this.name = 'phpmyadmin'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'password',
        description: 'MySQL root密碼',
        required: true,
        type: 'string',
      },
    ]
    this.description = `安裝phpMyAdmin`
  }

  async start() {
    log(`Install phpMyAdmin`)
    const password = this.args.password
    try {
      await execAsync(`sudo apt-get update`)
      await execAsync(`echo "phpmyadmin phpmyadmin/dbconfig-install boolean true" | sudo debconf-set-selections`)
      await execAsync(`echo "phpmyadmin phpmyadmin/app-password-confirm password ${password}" | sudo debconf-set-selections`)
      await execAsync(`echo "phpmyadmin phpmyadmin/mysql/admin-pass password ${password}" | sudo debconf-set-selections`)
      await execAsync(`echo "phpmyadmin phpmyadmin/mysql/app-pass password ${password}" | sudo debconf-set-selections`)
      await execAsync(`echo "phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2" | sudo debconf-set-selections`)
      try {
        await execAsync(`sudo add-apt-repository ppa:phpmyadmin/ppa -y`)
      } catch(error) {
        log(error, 'yellow')
      }
      await execAsync(`sudo apt-get install phpmyadmin -y`)
      await execAsync(`sudo a2enmod rewrite`)
      await this.setupTimeout()
      await execAsync(`sudo service apache2 restart`)
    } catch(error) {
      log(`phpMyAdmin安裝失敗: ${JSON.stringify(error)}`, 'red')
    }
  }

  async setupTimeout() {
    log(`Setup phpMyAdmin Timeout`)
    const ttl = 86400
    const phpIniPath = '/etc/php/7.1/cli/php.ini'
    await execAsync(`sudo sed -i 's,^session.gc_maxlifetime =.*$,session.gc_maxlifetime = ${ttl},' ${phpIniPath}`)

    const configIncPhp = '/etc/phpmyadmin/config.inc.php'
    const tempFilePath = '/tmp/config.inc.php'
    await execAsync(`sudo cp ${configIncPhp} ${tempFilePath}`)
    await appendFileSync(tempFilePath, `\n$cfg['LoginCookieValidity'] = ${ttl};\n`, 'utf-8')
    await execAsync(`sudo mv ${tempFilePath} ${configIncPhp}`)
  }
}

export default new PhpMyAdmin()