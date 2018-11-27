const BaseCommand = require('../BaseCommand')
class MySqlCreateUser extends BaseCommand{
  async exec() {
    try {
      const username = config.mysql.username
      const password = config.mysql.password
      await execAsync(`mysql -uroot -e "GRANT ALL PRIVILEGES ON *.* TO '${username}'@'%' IDENTIFIED BY '${password}' WITH GRANT OPTION"`)
      await execAsync(`mysql -uroot -e " FLUSH PRIVILEGES"`)
    } catch(error) {
      log(`Create MySQL user fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

module.exports = new MySqlCreateUser()