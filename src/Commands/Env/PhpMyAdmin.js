const BaseCommand = require('../BaseCommand')
class PhpMyAdmin extends BaseCommand{
  async exec() {
    try {
      const password = config.mysqlRootPassword
      await execAsync(`sudo apt-get update`)
      await execAsync(`echo "phpmyadmin phpmyadmin/dbconfig-install boolean true" | sudo debconf-set-selections`)
      await execAsync(`echo "phpmyadmin phpmyadmin/app-password-confirm password ${password}" | sudo debconf-set-selections`)
      await execAsync(`echo "phpmyadmin phpmyadmin/mysql/admin-pass password ${password}" | sudo debconf-set-selections`)
      await execAsync(`echo "phpmyadmin phpmyadmin/mysql/app-pass password ${password}" | sudo debconf-set-selections`)
      await execAsync(`echo "phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2" | sudo debconf-set-selections`)
      await execAsync(`sudo apt-get install phpmyadmin -y`)
      await execAsync(`sudo a2enmod rewrite`)
      await execAsync(`sudo service apache2 restart`)
    } catch(error) {
      log(`PhpMyAdmin Install/Setup Fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

module.exports = new PhpMyAdmin()