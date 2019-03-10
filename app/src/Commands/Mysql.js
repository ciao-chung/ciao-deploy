import BaseCommand from 'Commands/_BaseCommand'
import { spawnSync } from 'child_process'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
class Mysql extends BaseCommand{
  async setupCommand() {
    this.name = 'mysql'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'password',
        description: 'MySQL root密碼',
        required: true,
        type: 'string',
      },
    ]
    this.description = `安裝MySQL`
  }

  async start() {
    log(`Install MySQL`)

    try {
      const password = this.args.password
      await execAsync(`sudo apt-get update`)
      await execAsync(`echo "mysql-server mysql-server/root_password password ${password}" | sudo debconf-set-selections`)
      await execAsync(`echo "mysql-server mysql-server/root_password_again password ${password}" | sudo debconf-set-selections`)
      await execAsync(`sudo apt-get install mysql-server -y`)
      await execAsync(`sudo service mysql start`)
      await execAsync(`mysql --version`)
    } catch(error) {
      log(`Install MySQL fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

export default new Mysql()