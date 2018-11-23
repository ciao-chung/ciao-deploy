const BaseRunner = require('../BaseRunner')
class EnvBaseRunner extends BaseRunner{
  async start() {
    this.commands.env.installGit.exec()
  }
}

module.exports = () => new EnvBaseRunner()