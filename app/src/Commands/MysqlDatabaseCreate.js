import BaseCommand from 'Commands/_BaseCommand'
import { spawnSync } from 'child_process'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { env } from 'shelljs'
class MysqlDatabaseCreate extends BaseCommand{
  async setupCommand() {
    this.name = 'mysql-db-create'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'rootPassword',
        description: 'MySQL root密碼',
        required: true,
        type: 'string',
      },
      {
        name: 'db',
        description: '資料庫名稱',
        required: true,
        type: 'string',
      },
    ]
    this.description = `MySQL建立資料庫`
  }

  async start() {
    log(`Mysql database start create`)
    try {
      env['MYSQL_PWD'] = this.args.rootPassword
      await execAsync(`mysql -uroot -e "CREATE DATABASE IF NOT EXISTS ${this.args.db} CHARACTER SET utf8 COLLATE utf8_general_ci"`)
      await execAsync(`mysql -uroot -e "SHOW DATABASES;"`)
    } catch(error) {
      log(`MySQL資料庫建立失敗: ${JSON.stringify(error)}`, 'red')
    }
  }
}

export default new MysqlDatabaseCreate()