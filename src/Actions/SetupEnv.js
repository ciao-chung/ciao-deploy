const BaseAction = require('./BaseAction.js')
class SetupEnv extends BaseAction{
  async start() {
    this.env = {
      webserver: () => this.setupWebServer(),
      workspace: () => this.setupWorkspace(),
    }
    const response = await prompts({
      type: 'select',
      name: 'env',
      message: 'Choice environment',
      choices: [
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

  async setupWebServer() {
    this.runners.EnvBaseRunner().start()
  }

  async setupWorkspace() {

  }
}

module.exports = () => new SetupEnv()