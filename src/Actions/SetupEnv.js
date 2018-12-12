const BaseAction = require('./BaseAction.js')
class SetupEnv extends BaseAction{
  async start() {
    this.env = {
      webServer: async () => await this.runners.EnvWebServerRunner().start(),
      workSpace: async () => await this.runners.EnvWebWorkSpaceRunner().start(),
    }

    const env = await this.choiceEnv()
    if(env == 'exit') {
      return
    }

    if(!this.env[env]) {
      log('Environment type is invalid', 'red')
      return
    }

    this.env[env]()
  }

  async choiceEnv() {
    if(this.args.subAction) {
      return this.args.subAction
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

    return response.env
  }
}

module.exports = () => new SetupEnv()