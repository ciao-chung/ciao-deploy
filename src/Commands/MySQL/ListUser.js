const BaseCommand = require('../BaseCommand')
class MySql extends BaseCommand{
  async exec() {
    try {
      this.shelljs.env['MYSQL_PWD'] = config.mysqlRootPassword
      log(this.shelljs.env)
      await execAsync(`mysql -uroot -e "SELECT user FROM mysql.user"`)
    } catch(error) {
      log(`Install MySQL fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

module.exports = new MySql()