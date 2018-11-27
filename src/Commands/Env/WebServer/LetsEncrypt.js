const BaseCommand = require('../../BaseCommand')
class LetsEncrypt extends BaseCommand{
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install python-letsencrypt-apache -y`)
    await execAsync(`sudo wget https://dl.eff.org/certbot-auto`)
    await execAsync(`sudo mv certbot-auto ${certbotPath}`)
    await execAsync(`sudo chmod a+x certbot-auto`, { cwd: certbotPath })
  }
}

module.exports = new LetsEncrypt()