const BaseCommand = require('../BaseCommand')
class Unetbootin extends BaseCommand{
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo add-apt-repository ppa:gezakovacs/ppa -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install unetbootin -y`)
  }
}

module.exports = new Unetbootin()