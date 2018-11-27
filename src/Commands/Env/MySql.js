const BaseCommand = require('../BaseCommand')
class MySql extends BaseCommand{
  async exec() {
    try {
      const password = config.mysql.rootPassword
      await execAsync(`sudo apt-get update`)
      await execAsync(`sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password ${password}'`)
      await execAsync(`sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password ${password}'`)
      await execAsync(`sudo apt-get install mysql-server -y`)
    } catch(error) {
      log(`Install MySQL fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

module.exports = new MySql()