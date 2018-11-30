const BaseRunner = require('./BaseRunner')
class SingleCommandRunner extends BaseRunner{
  async start() {
    const commands = {
      // fish
      envInstallFishShell: this.commands.fish.install,
      envFishShellSetup: this.commands.fish.setupConfig,

      // env base
      envInstallBase: this.commands.env.base,
      envInstallGit: this.commands.env.git,
      envInstallPhp: this.commands.env.php,
      envInstallComposer: this.commands.env.composer,
      envInstallPhpMyAdmin: this.commands.env.phpMyAdmin,

      // mysql
      envInstallMySql: this.commands.mysql.install,
      envMySqlCreateUser: this.commands.mysql.createUser,
      envMySqlDeleteUser: this.commands.mysql.deleteUser,

      // apache
      envWebServerSignDomain: this.commands.apache.signDomain,

      // mysql
      envWebServerInstallLetsEncrypt: this.commands.letsEncrypt.install,
      envWebServerSignSSL: this.commands.letsEncrypt.signSSL,
    }

    let commandList = []
    for(const commandGroupName in this.commands) {
      const commandGroup = this.commands[commandGroupName]
      for(const commandName in commandGroup) {
        const command = commandGroup[commandName]
        commandList.push({
          title: command.title,
          value: command.instance,
        })
      }
    }

    const response = await prompts({
      type: 'select',
      name: 'command',
      message: 'Choice Command',
      choices: commandList,
    })

    if(!response.command) {
      log(`Command Not Found`, 'red')
      return
    }

    response.command.exec()
  }
}

module.exports = () => new SingleCommandRunner()