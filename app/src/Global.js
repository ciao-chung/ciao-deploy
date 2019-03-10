require('shelljs/global')
const shelljs = require('shelljs')
const chalk = require('chalk')
const moment = require('moment')
const yargsParser = require('yargs-parser')
const notifier = require('node-notifier')

class Global {
  constructor() {
    this.init()
  }

  setupEnvVariable() {
    global.pathResolve = require('path').resolve
    global.projectRoot = pathResolve(__dirname, '../../')
    global.projectConfig = require('../../project')
    global.appRoot = pathResolve(projectRoot, 'app')
    global.outputPath = pathResolve(appRoot, 'dist')
    global.productionPath = pathResolve(projectRoot, 'prod')
  }

  /**
   * log style(white, red, green, yellow, cyan, magenta)
   */
  log(content, style = 'cyan', time = true) {
    const result = typeof content == 'object' || typeof content == 'array'
      ? JSON.stringify(content)
      : content

    let display = chalk[`${style}Bright`](result)
    if(time) display += chalk.whiteBright(`\t at ${now()}`)
    console.log(display)
  }

  now(format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(new Date).format(format)
  }

  execAsync(command, options = {}, quiet = false) {
    // 允許設定不使用sudo
    if(withoutSudo) command = command.replace(new RegExp('sudo', 'g'), '')
    
    let computedOptions = {
      async: true,
      ...options,
    }

    if(!quiet) log(`RUN: ${command}`)
    if(options.cwd) log(`cwd: ${options.cwd}`)

    return new Promise((resolve, reject) => {
      if(args.debug) {
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

  async executeRemote(user, host, command, options) {
    await this.execAsync(`ssh -o StrictHostKeyChecking=no ${user}@${host} "${command}" `, options)
  }

  notify(message) {
    notifier.notify({
      title: projectConfig.name,
      message,
      icon: pathResolve(appRoot, 'assets/logo.png')
    })
  }

  async init() {
    global.chalk = chalk
    global.now = this.now
    global.log = this.log
    global.notify = this.notify
    global.execAsync = this.execAsync
    global.executeRemote = this.executeRemote
    global.args = yargsParser(process.argv.slice(2))
    delete global.args._
    global.withoutSudo = !!args.withoutSudo
    this.setupEnvVariable()
  }
}

new Global()