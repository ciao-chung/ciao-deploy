const BaseCommand = require('../BaseCommand')
class MySqlCreateUser extends BaseCommand{
  async exec() {
    try {
      const rootPassword = config.mysql.rootPassword
      this.shelljs.env['MYSQL_PWD'] = rootPassword
      for(const user of config.mysql.deleteUsers) {
        await execAsync(`mysql -uroot -e "DELETE FROM mysql.user WHERE user='${user}'"`)
        await execAsync(`mysql -uroot -e "FLUSH PRIVILEGES"`)
      }
    } catch(error) {
      log(`Create MySQL user fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

module.exports = new MySqlCreateUser()