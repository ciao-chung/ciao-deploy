import BaseCommand from 'Commands/_BaseCommand'
import { resolve } from 'path'
import CloneSource from 'WebDeploy/CloneSource'
import BuildFrontend from 'WebDeploy/BuildFrontend'
import BuildBackend from 'WebDeploy/BuildBackend'
import Rsync from 'WebDeploy/Rsync'
import CleanTemp from 'WebDeploy/CleanTemp'
import AfterRsync from 'WebDeploy/AfterRsync'
class WebDeploy extends BaseCommand{
  async setupCommand() {
    this.name = 'web-deploy'
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
    this.description = `Deploy Web Project`
  }

  async start() {
    await this.setupVariable()
    await this.workflow()
  }

  async setupVariable() {
    // 建立佈署的暫存資料夾名稱、路徑
    global.deployTempFolder = `${global.projectConfig.name}-${now('YYYYMMDDHHmmss')}`
    global.deployTempPath = resolve(process.env.PWD, deployTempFolder)
  }

  async workflow() {
    await CloneSource(this.commandConfig).start()
    await BuildFrontend(this.commandConfig).start()
    await BuildBackend(this.commandConfig).start()
    await Rsync(this.commandConfig).start()
    await CleanTemp(this.commandConfig).start()
    await AfterRsync(this.commandConfig).start()
    notify('Deploy successfully');
  }
}

export default new WebDeploy()