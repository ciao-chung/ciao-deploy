const BaseCommand = require('../BaseCommand')
class MySql extends BaseCommand{
  async exec() {
    try {
      const password = config.mysqlRootPassword
      await execAsync(`sudo apt-get update`)
      await execAsync(`echo "mysql-server mysql-server/root_password password ${password}" | sudo debconf-set-selections`)
      await execAsync(`echo "mysql-server mysql-server/root_password_again password ${password}" | sudo debconf-set-selections`)
      await execAsync(`sudo apt-get install mysql-server -y`)
      await execAsync(`mysql --version`)
    } catch(error) {
      log(`Install MySQL fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

module.exports = new MySql()