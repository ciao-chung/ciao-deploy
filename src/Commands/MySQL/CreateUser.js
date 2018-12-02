const BaseCommand = require('../BaseCommand')
class MySqlCreateUser extends BaseCommand{
  async exec() {
    try {
      this.shelljs.env['MYSQL_PWD'] = config.mysqlRootPassword
      for(const user of config.mysqlCreateUsers) {
        await execAsync(`mysql -uroot -e "GRANT ALL PRIVILEGES ON *.* TO '${user.username}'@'%' IDENTIFIED BY '${user.password}' WITH GRANT OPTION"`)
        await execAsync(`mysql -uroot -e "FLUSH PRIVILEGES"`)
      }
    } catch(error) {
      log(`Create MySQL user fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

module.exports = new MySqlCreateUser()