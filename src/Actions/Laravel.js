const BaseAction = require('./BaseAction.js')
class Laravel extends BaseAction{
  async start() {
    this.deployments = {
      init: async () => await this.runners.LaravelRunner().initProject(),
      deploy: async () => await this.runners.LaravelRunner().deploy(),
    }
    const response = await prompts({
      type: 'select',
      name: 'deployment',
      message: 'Choice Deployment',
      choices: [
        { title: 'Init', value: 'init' },
        { title: 'Deploy', value: 'deploy' },
        { title: 'Exit', value: 'exit' },
      ]
    })

    if(response.deployment == 'exit') {
      return
    }

    if(!this.deployments[response.deployment]) {
      log('Deployment type is invalid', 'red')
      return
    }

    this.deployments[response.deployment]()
  }
}

module.exports = () => new Laravel()