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

      try {
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
      } catch(error) {
        log(`Execute Command Fail: ${error}`, 'red')
        return reject({
          type: 'error',
          log: error,
        })
      }
    })
  }

  initActions() {
    this.actions = {
      setupEnv: require('./Actions/SetupEnv'),
      laravel: require('./Actions/Laravel'),
      commandGroup: require('./Actions/CommandGroup'),
      dumpConfig: require('./Actions/DumpConfig'),
    }
  }

  async init() {
    this.initActions()
    const action = await this.choiceAction()


    // exit
    if(!action || action == 'exit') {
      return
    }

    const isGroup = new RegExp('Group', 'g').test(action)
    if(!this.actions[action] && !isGroup) {
      log('Action type is invalid', 'red')
      return
    }

    const actionInstance = isGroup == true
      ? this.actions.commandGroup()
      : this.actions[action]()

    const actionGroup = isGroup == true
      ? action
      : null
    
    await this.setupConfig()
    await actionInstance.init()
    await actionInstance.start(actionGroup)
  }

  async choiceAction() {
    if(argv.action) {
      return argv.action
    }

    const response = await prompts({
      type: 'select',
      name: 'action',
      message: 'Choice Deploy Mode',
      choices: [
        { title: 'Setup Environment', value: 'setupEnv' },
        { title: 'Deploy Laravel', value: 'laravel' },
        { title: 'Group: Environment', value: 'envGroup' },
        { title: 'Group: Work Space', value: 'workspaceGroup' },
        { title: 'Group: Fish', value: 'fishGroup' },
        { title: 'Group: Let\'s Encrypt', value: 'letsEncryptGroup' },
        { title: 'Group: Apache', value: 'apacheGroup' },
        { title: 'Group: MySQL', value: 'mysqlGroup' },
        { title: 'Custom Command', value: 'command' },
        { title: 'Dump Config JSON File', value: 'dumpConfig' },
        { title: 'Exit', value: 'exit' },
      ]
    })

    return response.action
  }

  async setupConfig() {
    if(!argv.config) {
      global.config = {}
      for(const argName in argv) {
        if(argName == '_') continue
        if(argName == '$0') continue
        global.config[argName] = argv[argName]
      }
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