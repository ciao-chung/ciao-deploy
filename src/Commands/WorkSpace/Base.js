const BaseCommand = require('../BaseCommand')
class Base extends BaseCommand{
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install gnome-disk-utility -y`)
    await execAsync(`sudo apt-get install openvpn -y`)
    await execAsync(`sudo yarn global add apidoc -y`)
  }
}

module.exports = new Base()