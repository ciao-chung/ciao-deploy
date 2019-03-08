import BaseCommand from 'Commands/_BaseCommand'
import CloneSource from 'CubeDeploy/CloneSource'
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
    this.deployTempFolder = `${global.projectConfig.name}-${new Date().getTime()}`
    this.deployTempPath = resolve(process.env.PWD, this.deployTempFolder)
    CloneSource(this.commandConfig).start(this.deployTempFolder, this.deployTempPath)
  }
}

export default new CubeDeploy()