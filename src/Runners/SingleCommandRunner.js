const BaseRunner = require('./BaseRunner')
class SingleCommandRunner extends BaseRunner{
  async start() {
    const commands = {
      envInstallBase: this.commands.env.InstallBase,
      envInstallFishShell: this.commands.env.InstallFishShell,
      envFishShellSetup: this.commands.env.FishShellSetup,
      envInstallGit: this.commands.env.InstallGit,
      envInstallPhp: this.commands.env.InstallPhp,
      envInstallComposer: this.commands.env.InstallComposer,
      envInstallMySql: this.commands.env.InstallMySql,
      envMySqlCreateUser: this.commands.env.MySqlCreateUser,
      envInstallPhpMyAdmin: this.commands.env.InstallPhpMyAdmin,
      envWebServerInstallLetsEncrypt: this.commands.env.webserver.InstallLetsEncrypt,
      envWebServerSignDomain: this.commands.env.webserver.SignDomain,
      envWebServerSignSSL: this.commands.env.webserver.SignSSL,
    }

    const response = await prompts({
      type: 'select',
      name: 'command',
      message: 'Choice Command',
      choices: [
        { title: 'Env: Install base', value: 'envInstallBase' },
        { title: 'Env: Install Fish Shell', value: 'envInstallFishShell' },
        { title: 'Env: Fish Shell setup', value: 'envFishShellSetup' },
        { title: 'Env: Install git', value: 'envInstallGit' },
        { title: 'Env: Install PHP', value: 'envInstallPhp' },
        { title: 'Env: Install composer', value: 'envInstallComposer' },
        { title: 'Env: Install MySQL', value: 'envInstallMySql' },
        { title: 'Env: Mysql create user', value: 'envMySqlCreateUser' },
        { title: 'Env: Install phpMyAdmin', value: 'envInstallPhpMyAdmin' },
        { title: 'Env WebServer: Install Let\'s Encrypt', value: 'envWebServerInstallLetsEncrypt' },
        { title: 'Env WebServer: Sign domain', value: 'envWebServerSignDomain' },
        { title: 'Env WebServer: Sign SSL', value: 'envWebServerSignSSL' },
      ]
    })

    if(!commands[response.command]) {
      log(`Command Not Found`, 'red')
      return
    }

    commands[response.command].exec()
  }
}

module.exports = () => new SingleCommandRunner()