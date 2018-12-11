const BaseCommand = require('../BaseCommand')
class Base extends BaseCommand{
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install vim -y`)
    await execAsync(`sudo apt-get install curl -y`)
    await execAsync(`sudo apt-get install xclip -y`)
    await execAsync(`sudo apt-get install imagemagick -y`)
  }
}

module.exports = new Base()