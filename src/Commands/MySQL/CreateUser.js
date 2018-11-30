const BaseCommand = require('../BaseCommand')
class MySqlCreateUser extends BaseCommand{
  async exec() {
    try {
      const rootPassword = config.mysql.rootPassword
      this.shelljs.env['MYSQL_PWD'] = rootPassword
      for(const user of config.mysql.createUsers) {
        await execAsync(`mysql -uroot -e "GRANT ALL PRIVILEGES ON *.* TO '${user.username}'@'%' IDENTIFIED BY '${user.password}' WITH GRANT OPTION"`)
        await execAsync(`mysql -uroot -e "FLUSH PRIVILEGES"`)
      }
    } catch(error) {
      log(`Create MySQL user fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

module.exports = new MySqlCreateUser()