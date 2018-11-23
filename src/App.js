const shelljs = require('shelljs/global')
const chalk = require('chalk')
const moment = require('moment')
const prompts = require('prompts')
class App {
  constructor() {
    global.chalk = chalk
    global.log = this.log
    global.now = this.now
    global.execAsync = this.execAsync
    this.action = null
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

  async init() {
    let response = await prompts({
      type: 'select',
      name: 'action',
      message: 'Choice Deploy Mode',
      choices: [
        { title: 'Just execute single command group', value: 'commandGroup' },
        { title: 'Setup environment', value: 'setupEnv' },
        { title: 'Deploy webpack', value: 'webpack' },
        { title: 'Deploy laravel', value: 'laravel' },
        { title: 'Rsync only', value: 'rsync' },
        { title: 'Custom command', value: 'command' },
      ]
    });

    if(!response.action) {
      log('Action type is invalid', 'red')
      return
    }

    this.action = response.action
  }
}

new App()