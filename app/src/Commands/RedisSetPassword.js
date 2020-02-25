import BaseCommand from 'Commands/_BaseCommand'
class RedisSetPassword extends BaseCommand{
  async setupCommand() {
    this.name = 'redis-set-password'
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
    this.description = `設定Redis`
  }

  async start() {
    log(`Setup Redis password`)
    const password = this.args.password
    const configFilePath = '/etc/redis/redis.conf'

    try {
      await execAsync(`sudo sed -i 's,^# requirepass.*$,requirepass${password},' ${configFilePath}`, {}, true)
      await execAsync(`sudo sed -i 's,^requirepass.*$,requirepass ${password},' ${configFilePath}`, {}, true)
      await execAsync(`sudo service redis-server restart`)
    } catch(error) {
      log(`Install Redis fail: ${JSON.stringify(error)}`, 'red')
    }
  }
}

export default new RedisSetPassword()