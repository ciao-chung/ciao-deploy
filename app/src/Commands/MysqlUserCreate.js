import BaseCommand from 'Commands/_BaseCommand'
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
      {
        name: 'ver8',
        description: '使用版本8的script',
        type: 'boolean',
      },
    ]
    this.description = `MySQL建立使用者`
  }

  async start() {
    log(`Mysql user start create`)
    try {
      env['MYSQL_PWD'] = this.args.rootPassword
      if(this.args.ver8) {
        await execAsync(`mysql -uroot -e "CREATE USER '${this.args.username}'@'%' IDENTIFIED BY '${this.args.password}';"`)
        await execAsync(`mysql -uroot -e "ALTER USER ${this.args.username} IDENTIFIED WITH mysql_native_password BY '${this.args.password}';"`)
      }

      else {
        await execAsync(`mysql -uroot -e "GRANT ALL PRIVILEGES ON *.* TO '${this.args.username}'@'%' IDENTIFIED BY '${this.args.password}' WITH GRANT OPTION"`)
      }
      await execAsync(`mysql -uroot -e "FLUSH PRIVILEGES"`)
      await execAsync(`mysql -uroot -e "SELECT user FROM mysql.user"`)
    } catch(error) {
      log(`MySQL帳號建立失敗: ${JSON.stringify(error)}`, 'red')
    }
  }
}

export default new MysqlUserCreate()