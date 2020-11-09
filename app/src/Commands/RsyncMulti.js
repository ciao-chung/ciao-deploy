import BaseCommand from 'Commands/_BaseCommand'
import { resolve } from 'path'
import prettyjson from 'prettyjson'
import Rsync from 'WebDeploy/Rsync'
import AfterRsync from 'WebDeploy/AfterRsync'
import SetupExtraService from 'WebDeploy/SetupExtraService'
class WebDeploy extends BaseCommand{
  async setupCommand() {
    this.name = 'rsync-multi'
    this.configFile = {
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'source',
        description: '檔案來源',
        type: 'string',
      },
    ]
    this.description = `將打包後的目錄Rsync多台server`
  }

  async start() {
    if(this.args.dump) {
      this.dumpConfig()
      return
    }

    await this.workflow()
  }

  async dumpConfig() {
    console.log(prettyjson.render(this.commandConfig))
  }

  async workflow() {
    if(this.getInfoLabel()) {
      log(`開始執行Rsync: ${this.getInfoLabel()}`, 'yellow')
    }

    const rsync = this.commandConfig.deploy.rsync
    const rules = !this.commandConfig.deploy.rsync ? null : rsync.rules
    if(!Array.isArray(rules)) {
      log(`deploy.rsync.rules格式錯誤(必須為array格式)`, 'red')
      process.exit()
    }

    global.deployTempPath = this.args.source

    for(const i in rules) {
      const index = parseInt(i)+1
      const rule = rules[i]
      log('\n', 'white', false)
      log(`==========[正在處理第${index}台Server]==========`, 'green')
      notify(`正在處理第${index}台Server`)
      log(rule)
      let commandConfig = {
        deploy: {
          target: rule,
        }
      }
      await Rsync(commandConfig).start()
      await AfterRsync(commandConfig, this.args).start()
      await SetupExtraService(commandConfig, this.args).start()
      log(`==========第${index}台Server處理完成==========\n`, 'white', false)
      notify(`第${index}台Server處理完成`)
    }
    notify('Rsync finished');
  }

  getInfoLabel() {
    if(!this.commandConfig.info) return null
    return this.commandConfig.info.label
  }
}

export default new WebDeploy()