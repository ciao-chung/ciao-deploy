const BaseCommand = require('../BaseCommand')
class Git extends BaseCommand{
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install git -y`)
    await execAsync(`sudo apt-get install tig -y`)
    await execAsync(`git config --global core.editor vim`)
    await execAsync(`git config --global push.default simple`)
    await execAsync(`git config --global core.filemode false`)
  }
}

module.exports = new Git()