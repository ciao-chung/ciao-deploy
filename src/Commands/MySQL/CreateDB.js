const BaseCommand = require('../BaseCommand')
class MySqlCreateDB extends BaseCommand{
  async exec() {
    try {
      this.shelljs.env['MYSQL_PWD'] = config.mysqlRootPassword
      for(const dbName of config.mysqlCreateDBs) {
        await execAsync(`mysql -uroot -e "CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8 COLLATE utf8_general_ci"`)
      }
    } catch(error) {
      log(`Create MySQL database fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

module.exports = new MySqlCreateDB()