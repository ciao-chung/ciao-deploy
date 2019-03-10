import BaseCommand from 'Commands/_BaseCommand'
import { spawnSync } from 'child_process'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { env } from 'shelljs'
class MysqlUserDelete extends BaseCommand{
  async setupCommand() {
    this.name = 'mysql-user-delete'
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
    ]
    this.description = `MySQL刪除使用者`
  }

  async start() {
    log(`Mysql user start delete`)
    try {
      env['MYSQL_PWD'] = this.args.rootPassword
      await execAsync(`mysql -uroot -e "DELETE FROM mysql.user WHERE user='${this.args.username}'"`)
      await execAsync(`mysql -uroot -e "FLUSH PRIVILEGES"`)
      await execAsync(`mysql -uroot -e "SELECT user FROM mysql.user"`)
    } catch(error) {
      log(`MySQL帳號刪除失敗: ${JSON.stringify(error)}`, 'red')
    }
  }
}

export default new MysqlUserDelete()