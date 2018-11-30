const BaseCommand = require('../BaseCommand')
class LetsEncrypt extends BaseCommand{
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install software-properties-common -y`)
    await execAsync(`sudo add-apt-repository ppa:certbot/certbot -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install python-certbot-apache -y`)
  }
}

module.exports = new LetsEncrypt()