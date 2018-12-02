const BaseCommand = require('../BaseCommand')
class Git extends BaseCommand{
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install git -y`)
    await execAsync(`git --version`)
    await execAsync(`sudo apt-get install tig -y`)
    await execAsync(`tig --version`)

    try {
      const username = config.gitUsername
      const email = config.gitEmail
      await execAsync(`git config --global user.name "${username}"`)
      await execAsync(`git config --global user.email "${email}"`)
    } catch (error) {
      log(`Git user, email setup fail: ${error}`, 'red')
    }

    await execAsync(`git config --global core.editor vim`)
    await execAsync(`git config --global push.default simple`)
    await execAsync(`git config --global core.filemode false`)
  }
}

module.exports = new Git()