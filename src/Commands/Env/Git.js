import BaseCommand from '../BaseCommand'
class Git extends BaseCommand{
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install git -y`)
    await execAsync(`sudo apt-get install tig -y`)
  }
}

module.exports = new Git()