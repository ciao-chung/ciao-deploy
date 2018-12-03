require('shelljs/global')
const shelljs = require('shelljs')
const chalk = require('chalk')
const moment = require('moment')
const prompts = require('prompts')
const { readFileSync } = require('fs')
const { argv } = require('yargs')
class App {
  constructor() {
    global.chalk = chalk
    global.config = null
    global.log = this.log
    global.now = this.now
    global.prompts = prompts
    global.execAsync = this.execAsync
    global.certbotPath = '/home'
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

    log(`RUN: ${command}`)
    if(options.cwd) log(`cwd: ${options.cwd}`)

    return new Promise((resolve, reject) => {
      if(argv.debug) {
        resolve()
        return
      }

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
      laravel: require('./Actions/Laravel'),
      singleCommand: require('./Actions/SingleCommand'),
      dumpConfig: require('./Actions/DumpConfig'),
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
        { title: 'Deploy laravel', value: 'laravel' },
        { title: 'Run Single Command', value: 'singleCommand' },
        { title: 'Custom command', value: 'command' },
        { title: 'Dump config.json file', value: 'dumpConfig' },
      ]
    })

    if(!this.actions[response.action]) {
      log('Action type is invalid', 'red')
      return
    }

    const action = this.actions[response.action]()
    await this.setupConfig()
    await action.init()
    await action.start()
  }

  async setupConfig() {
    if(!argv.config) {
      global.config = {}
      return
    }

    try {
      global.config = await JSON.parse(readFileSync(argv.config, 'utf8'))
    } catch(error) {
      log(error, 'red')
    }
  }
}

new App()