import BaseCommand from 'Commands/_BaseCommand'
import CloneSource from 'CubeDeploy/CloneSource'
import BuildFrontend from 'CubeDeploy/BuildFrontend'
import BuildBackend from 'CubeDeploy/BuildBackend'
import { resolve } from 'path'
class CubeDeploy extends BaseCommand{
  async setupCommand() {
    this.name = 'cube-deploy'
    this.configFile = {
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'first',
        description: '第一次佈署',
        defaultValue: false,
        type: 'boolean',
      },
    ]
    this.description = `Deploy Cube Project`
  }

  async start() {
    // 建立佈署的暫存資料夾名稱、路徑
    global.deployTempFolder = `${global.projectConfig.name}-${now('YYYYMMDDHHmmss')}`
    global.deployTempPath = resolve(process.env.PWD, deployTempFolder)

    await CloneSource(this.commandConfig).start()
    await BuildFrontend(this.commandConfig).start()
    await BuildBackend(this.commandConfig).start()
  }
}

export default new CubeDeploy()