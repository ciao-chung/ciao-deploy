const BaseCommand = require('../BaseCommand')
class PhpMyAdmin extends BaseCommand{
  async exec() {
    try {
      const password = config.mysql.rootPassword
      await execAsync(`sudo apt-get update`)
      await execAsync(`debconf-set-selections <<< 'phpmyadmin phpmyadmin/dbconfig-install boolean true'`)
      await execAsync(`debconf-set-selections <<< 'phpmyadmin phpmyadmin/app-password-confirm password ${password}'`)
      await execAsync(`debconf-set-selections <<< 'phpmyadmin phpmyadmin/mysql/admin-pass password ${password}'`)
      await execAsync(`debconf-set-selections <<< 'phpmyadmin phpmyadmin/mysql/app-pass password ${password}'`)
      await execAsync(`debconf-set-selections <<< 'phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2'`)
      await execAsync(`sudo apt-get install phpmyadmin -y`)
      await execAsync(`sudo a2enmod rewrite`)
      await execAsync(`sudo service apache2 restart`)
    } catch(error) {
      log(`Create MySQL user fail: ${error}`, 'red')
    }
  }
}

module.exports = new PhpMyAdmin()