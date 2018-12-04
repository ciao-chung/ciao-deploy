const BaseCommand = require('../BaseCommand')
class MySqlDeleteDB extends BaseCommand{
  async exec() {
    if(!Array.isArray(config.mysqlCreateDBs)) return

    try {
      this.shelljs.env['MYSQL_PWD'] = config.mysqlRootPassword
      for(const dbName of config.mysqlDeleteDBs) {
        await execAsync(`mysql -uroot -e "DROP DATABASE IF EXISTS ${dbName}"`)
      }
    } catch(error) {
      log(`Create MySQL database fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

module.exports = new MySqlDeleteDB()