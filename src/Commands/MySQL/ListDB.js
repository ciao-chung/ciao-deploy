const BaseCommand = require('../BaseCommand')
class MySqlListDB extends BaseCommand{
  async exec() {
    try {
      this.shelljs.env['MYSQL_PWD'] = config.mysqlRootPassword
      log(this.shelljs.env)
      await execAsync(`mysql -uroot -e "SHOW DATABASES;"`)
    } catch(error) {
      log(`Install MySQL fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

module.exports = new MySqlListDB()