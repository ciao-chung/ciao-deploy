const BaseCommand = require('../BaseCommand')
class MySqlDeleteUser extends BaseCommand{
  async exec() {
    if(!Array.isArray(config.mysqlCreateUsers)) return

    try {
      this.shelljs.env['MYSQL_PWD'] = config.mysqlRootPassword
      for(const user of config.mysqlDeleteUsers) {
        await execAsync(`mysql -uroot -e "DELETE FROM mysql.user WHERE user='${user}'"`)
        await execAsync(`mysql -uroot -e "FLUSH PRIVILEGES"`)
      }
    } catch(error) {
      log(`Create MySQL user fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

module.exports = new MySqlDeleteUser()