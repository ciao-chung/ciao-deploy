import BaseCommand from 'Commands/_BaseCommand'
class Version extends BaseCommand{
  async setupCommand() {
    this.name = 'version'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = []
    this.description = `檢查版本資訊`
  }

  async start() {
    log(`目前版本${packageJsonContent.version}`, 'yellow')
  }
}

export default new Version()