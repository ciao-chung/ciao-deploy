const BaseCommand = require('../BaseCommand')
class TestRemoteGitRepo extends BaseCommand{
  async exec() {
    try {
      await execAsync(`ssh -T git@github.com`)
    } catch(error) {
      log(`${JSON.stringify(error)}`, 'yellow')
    }

    try {
      await execAsync(`ssh -T git@bitbucket.org`)
    } catch(error) {
      log(`${error}`, 'yellow')
    }
  }
}

module.exports = new TestRemoteGitRepo()