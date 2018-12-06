const BaseAction = require('./BaseAction.js')
class SetupEnv extends BaseAction{
  async start() {
    this.env = {
      webServer: async () => await this.runners.EnvWebServerRunner().start(),
      workSpace: async () => {},
    }
    const response = await prompts({
      type: 'select',
      name: 'env',
      message: 'Choice environment',
      choices: [
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