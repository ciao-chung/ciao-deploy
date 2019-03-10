import BaseCommand from 'Commands/_BaseCommand'
import { spawnSync } from 'child_process'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { env } from 'shelljs'
class MysqlUserCreate extends BaseCommand{
  async setupCommand() {
    this.name = 'mysql-user-create'
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
        name: 'username',
        description: '使用者帳號',
        required: true,
        type: 'string',
      },
      {
        name: 'password',
        description: '使用者密碼',
        required: true,
        type: 'string',
      },
    ]
    this.description = `MySQL建立使用者`
  }

  async start() {
    log(`Mysql user start create`)
    try {
      env['MYSQL_PWD'] = this.args.rootPassword
      await execAsync(`mysql -uroot -e "GRANT ALL PRIVILEGES ON *.* TO '${this.args.username}'@'%' IDENTIFIED BY '${this.args.password}' WITH GRANT OPTION"`)
      await execAsync(`mysql -uroot -e "FLUSH PRIVILEGES"`)
    } catch(error) {
      log(`MySQL帳號建立失敗: ${JSON.stringify(error)}`, 'red')
    }
  }
}

export default new MysqlUserCreate()