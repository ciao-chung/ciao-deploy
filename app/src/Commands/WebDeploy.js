import BaseCommand from 'Commands/_BaseCommand'
import { resolve } from 'path'
import prettyjson from 'prettyjson'
import CloneSource from 'WebDeploy/CloneSource'
import BuildFrontend from 'WebDeploy/BuildFrontend'
import BuildBackend from 'WebDeploy/BuildBackend'
import Rsync from 'WebDeploy/Rsync'
import CleanTemp from 'WebDeploy/CleanTemp'
import AfterRsync from 'WebDeploy/AfterRsync'
import SetupExtraService from 'WebDeploy/SetupExtraService'
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
      {
        name: 'dump',
        description: '查看設定檔',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'buildOnlyPath',
        description: '僅執行build階段, 此參數設定build的目標路徑',
        type: 'string',
      },
    ]
    this.description = `Deploy Web Project`
  }

  async start() {
    if(this.args.dump) {
      this.dumpConfig()
      return
    }

    await this.setupVariable()
    await this.workflow()
  }

  async dumpConfig() {
    console.log(prettyjson.render(this.commandConfig))
  }

  async setupVariable() {
    // 建立佈署的暫存資料夾名稱、路徑
    global.deployTempFolder = `${global.projectConfig.name}-${now('YYYYMMDDHHmmss')}`
    global.deployTempPath = resolve(process.env.PWD, deployTempFolder)
  }

  async workflow() {
    if(this.getInfoLabel()) {
      log(`開始執行佈署: ${this.getInfoLabel()}`, 'yellow')
    }

    await CloneSource(this.commandConfig).start()
    await BuildFrontend(this.commandConfig).start()
    await BuildBackend(this.commandConfig).start()
    notify('Build successfully');

    if(!this.args.buildOnlyPath) {
      await Rsync(this.commandConfig).start()
      await AfterRsync(this.commandConfig, this.args).start()
      await SetupExtraService(this.commandConfig, this.args).start()
      notify('Deploy successfully');
    }

    await CleanTemp(this.commandConfig).start() // 一定要擺最後
  }

  getInfoLabel() {
    if(!this.commandConfig.info) return null
    return this.commandConfig.info.label
  }
}

export default new WebDeploy()