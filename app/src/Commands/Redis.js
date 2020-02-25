import BaseCommand from 'Commands/_BaseCommand'
class Redis extends BaseCommand{
  async setupCommand() {
    this.name = 'Redis'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'password',
        description: 'Redis密碼',
        required: true,
        type: 'string',
      },
    ]
    this.description = `安裝Redis`
  }

  async start() {
    log(`Install Redis Server`)
    const password = this.args.password
    const configFilePath = '/etc/redis/redis.conf'

    try {
      await execAsync(`sudo apt-get update -y`)
      await execAsync(`sudo apt-get install redis-server -y`)
      await execAsync(`sudo sed -i 's,^requirepass .*$,requirepass ${password},' ${configFilePath}`, {}, true)
      await execAsync(`sudo systemctl enable redis-server.service`)
      await execAsync(`sudo service redis-server restart`)
      await execAsync(`sudo redis-cli -v`)
      await execAsync(`sudo redis-cli info stats`)
    } catch(error) {
      log(`Install Redis fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

export default new Redisc()