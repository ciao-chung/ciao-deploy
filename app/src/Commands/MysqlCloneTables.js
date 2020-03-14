import BaseCommand from 'Commands/_BaseCommand'
import { env } from 'shelljs'
class MysqlCloneTables extends BaseCommand{
  async setupCommand() {
    this.name = 'mysql-db-clone-table'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'username',
        description: 'MySQL username',
        required: true,
        type: 'string',
      },
      {
        name: 'password',
        description: 'MySQL password',
        required: true,
        type: 'string',
      },
      {
        name: 'from',
        description: '來源資料庫名稱',
        required: true,
        type: 'string',
      },
      {
        name: 'to',
        description: '目標資料庫名稱',
        required: true,
        type: 'string',
      },
      {
        name: 'tables',
        description: 'table(可用逗號分隔多個)',
        required: true,
        type: 'array',
      },
    ]
    this.description = `MySQL複製table`
  }

  async start() {
    log(`Mysql database start clone table`)
    for(const table of this.args.tables) {
      await execAsync(`mkdir -p /tmp/ciao-deploy-clone-db-table`)
      const tempSql = `/tmp/ciao-deploy-clone-db-table/${table}.sql`
      log(`正在將${table} table從資料庫${this.args.from}複製到${this.args.to}`)
      try {
        await execAsync(`mysqldump -u ${this.args.username} -p${this.args.password} ${this.args.from} ${table} > ${tempSql}`)
        await execAsync(`mysql -u ${this.args.username} -p${this.args.password} ${this.args.to} < ${tempSql}`)
      } catch(error) {
        log(`MySQL table [${table}]複製失敗: ${JSON.stringify(error)}`, 'red')
      }
    }
  }
}

export default new MysqlCloneTables()