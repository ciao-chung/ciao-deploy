const { resolve } = require('path')
const { readFileSync, writeFileSync } = require('fs')
class SetupLaravelEnvFile {
  constructor() {
    this.resolve = resolve
    this.readFileSync = readFileSync
    this.writeFileSync = writeFileSync
  }

  async set(deployConfig, envFilePath) {
    this.deployConfig = deployConfig
    this.env = this.deployConfig.env
    try {
      const envFileContent = this.readFileSync(envFilePath, 'utf8')
      this.variables = envFileContent.split('\n')
    } catch(error) {
      log(`Project [${deployConfig.name}] env file not found: ${error}`, 'red')
      return
    }


    let result = ''
    for(const line of this.variables) {
      if(!line) {
        result += `\n`
        continue
      }

      const key = line.split('=')[0]
      const value = line.split('=')[1]

      // use origin value
      if(!this.env[key]) {
        result += `${key}=${value}\n`
      }

      // use custom value
      else {
        log(`Project [${deployConfig.name}] set env variable, ${key}=${value}`, 'green')
        result += `${key}=${this.env[key]}\n`
      }
    }

    this.writeFileSync(envFilePath, result, 'utf8')
  }
}

module.exports = new SetupLaravelEnvFile()