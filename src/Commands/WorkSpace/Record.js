const BaseCommand = require('../BaseCommand')
class Record extends BaseCommand{
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo add-apt-repository ppa:peek-developers/stable -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install peek -y`)

    await execAsync(`sudo add-apt-repository ppa:maarten-baert/simplescreenrecorder -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install simplescreenrecorder -y`)
  }
}

module.exports = new Record()