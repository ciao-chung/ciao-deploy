require('shelljs/global')
const shelljs = require('shelljs')
const chalk = require('chalk')
const moment = require('moment')
const prompts = require('prompts')
class App {
  constructor() {
    global.chalk = chalk
    global.log = this.log
    global.now = this.now
    global.prompts = prompts
    global.execAsync = this.execAsync
    this.init()
  }

  /**
   * log style(white, red, green, yellow, cyan, magenta)
   */
  log(content, style = 'cyan') {
    console.log(chalk[`${style}Bright`](content)+chalk.whiteBright(`\t at ${now()}`))
  }

  now() {
    return moment(new Date).format('YYYY-MM-DD HH:mm:ss')
  }

  execAsync(command, options = {}) {
    log(`RUN: ${command}`)
    let computedOptions = {
      async: true,
      ...options,
    }
    return new Promise((resolve, reject) => {
      shelljs.exec(command, computedOptions, async(code, stdout, stderr) => {
        if(code != 0) {
          log(stderr, 'red')
          return reject({
            type: 'error',
            log: stderr,
          })
        }

        return resolve({
          type: 'success',
          log: stdout,
        })
      })
    })
  }

  initActions() {
    this.actions = {
      setupEnv: require('./Actions/SetupEnv'),
    }
  }

  async init() {
    this.initActions()

    const response = await prompts({
      type: 'select',
      name: 'action',
      message: 'Choice deploy mode',
      choices: [
        { title: 'Setup environment', value: 'setupEnv' },
        { title: 'Just execute single command group', value: 'commandGroup' },
        { title: 'Deploy webpack', value: 'webpack' },
        { title: 'Deploy laravel', value: 'laravel' },
        { title: 'Rsync only', value: 'rsync' },
        { title: 'Custom command', value: 'command' },
        { title: 'Sign domain', value: 'domain' },
      ]
    })

    if(!this.actions[response.action]) {
      log('Action type is invalid', 'red')
      return
    }

    const action = this.actions[response.action]()
    action.start()
  }
}

new App()