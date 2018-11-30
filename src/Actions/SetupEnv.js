const BaseAction = require('./BaseAction.js')
class SetupEnv extends BaseAction{
  async start() {
    this.env = {
      installFishShell: async () => await this.runners.EnvFishRunner().install(),
      setupFishShell: async () => await this.runners.EnvFishRunner().setup(),
      webServer: async () => await this.runners.EnvWebServerRunner().start(),
      workSpace: async () => {},
    }
    const response = await prompts({
      type: 'select',
      name: 'env',
      message: 'Choice environment',
      choices: [
        { title: 'Install Fish Shell', value: 'installFishShell' },
        { title: 'Setup Fish Shell', value: 'setupFishShell' },
        { title: 'Web server', value: 'webServer' },
        { title: 'Workspace', value: 'workSpace' },
        { title: 'Exit', value: 'exit' },
      ]
    })

    if(response.env == 'exit') {
      return
    }

    if(!this.env[response.env]) {
      log('Environment type is invalid', 'red')
      return
    }

    this.env[response.env]()
  }
}

module.exports = () => new SetupEnv()