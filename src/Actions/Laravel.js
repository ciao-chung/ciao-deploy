const BaseAction = require('./BaseAction.js')
class Laravel extends BaseAction{
  async start() {
    this.deployments = {
      init: async () => await this.runners.LaravelRunner().initProject(),
      deploy: async () => await this.runners.LaravelRunner().deploy(),
      initAllInOne: async () => await this.runners.LaravelRunner().initAllInOne(),
    }

    const deployment = await this.choiceDeployment()
    if(deployment == 'exit') {
      return
    }

    if(!this.deployments[deployment]) {
      log('Deployment type is invalid', 'red')
      return
    }

    this.deployments[deployment]()
  }

  async choiceDeployment() {
    if(this.args.subAction) {
      return this.args.subAction
    }

    const response = await prompts({
      type: 'select',
      name: 'deployment',
      message: 'Choice Deployment',
      choices: [
        { title: 'Init', value: 'init' },
        { title: 'Deploy', value: 'deploy' },
        { title: 'Init All In One', value: 'initAllInOne' },
        { title: 'Exit', value: 'exit' },
      ]
    })

    return response.deployment
  }
}

module.exports = () => new Laravel()