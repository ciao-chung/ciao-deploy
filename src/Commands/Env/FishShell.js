const BaseCommand = require('../BaseCommand')
class FishShell extends BaseCommand{
  async exec() {
    // install fish shell
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install git -y`)
    await execAsync(`sudo apt-add-repository ppa:fish-shell/release-2 -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install fish -y`)
    await execAsync(`fish --version`)
  }
}

module.exports = new FishShell()