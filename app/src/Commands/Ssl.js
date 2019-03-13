import BaseCommand from 'Commands/_BaseCommand'
class Ssl extends BaseCommand{
  async setupCommand() {
    this.name = 'ssl'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = []
    this.description = `安裝Let\'s Encrypt certbot`
  }

  async start() {
    log(`Install LetsEncrypt`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install software-properties-common -y`)
    await execAsync(`sudo add-apt-repository ppa:certbot/certbot -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install python-certbot-apache -y`)
    await execAsync(`sudo systemctl status certbot.timer`)
  }
}

export default new Ssl()