import BaseCommand from 'Commands/_BaseCommand'
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
      await execAsync(`sudo apt-get install phpmyadmin -y`)
      await execAsync(`sudo a2enmod rewrite`)
      await execAsync(`sudo service apache2 restart`)
    } catch(error) {
      log(`phpMyAdmin安裝失敗: ${JSON.stringify(error)}`, 'red')
    }
  }
}

export default new PhpMyAdmin()