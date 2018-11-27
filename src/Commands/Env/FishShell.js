const BaseCommand = require('../BaseCommand')
class FishShell extends BaseCommand{
  async exec() {
    // install fish shell
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-add-repository ppa:fish-shell/release-2 -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install fish -y`)

    // install omf
    await execAsync(`curl -L https://get.oh-my.fish > install`)
    await execAsync(`fish install --path=~/.local/share/omf --config=~/.config/omf`)
    await execAsync(`rm ./install`)
    await execAsync(`omf install gitstatus`)
  }
}

module.exports = new FishShell()