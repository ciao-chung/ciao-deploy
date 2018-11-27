const BaseAction = require('./BaseAction.js')
class SetupEnv extends BaseAction{
  async start() {
    this.env = {
      installFishShell: () => this.installFishShell(),
      setupFishShell: () => this.setupFishShell(),
      webserver: () => this.setupWebServer(),
      workspace: () => this.setupWorkspace(),
    }
    const response = await prompts({
      type: 'select',
      name: 'env',
      message: 'Choice environment',
      choices: [
        { title: 'Install Fish Shell', value: 'installFishShell' },
        { title: 'Setup Fish Shell', value: 'setupFishShell' },
        { title: 'Web server', value: 'webserver' },
        { title: 'Workspace', value: 'workspace' },
        { title: 'Create MySQL User', value: 'mysqlCreateUser' },
      ]
    })

    if(!this.env[response.env]) {
      log('Environment type is invalid', 'red')
      return
    }

    this.env[response.env]()
  }

  async installFishShell() {
    await this.runners.EnvFishRunner().install()
  }

  async setupFishShell() {
    await this.runners.EnvFishRunner().setup()
  }

  async setupWebServer() {
    await this.runners.EnvBaseRunner().start()
    await this.runners.EnvWebServerRunner().start()
  }

  async setupWorkspace() {

  }
}

module.exports = () => new SetupEnv()