import BaseCommand from 'Commands/_BaseCommand'
import { resolve } from 'path'
import prettyjson from 'prettyjson'
import CustomJob from 'CustomDeploy/CustomJob'
class CustomDeploy extends BaseCommand{
  async setupCommand() {
    this.name = 'custom-deploy'
    this.configFile = {
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'dump',
        description: '查看設定檔',
        defaultValue: false,
        type: 'boolean',
      },
    ]
    this.description = `自訂佈署`
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
    for(const jobName in this.commandConfig.deploy) {
      const jobConfig = this.commandConfig.deploy[jobName]
      const Job = CustomJob(jobName, jobConfig)
      try {
        await Job.execute()
      } catch(error) {
        log(`Job ${jobName} fail: ${error}`, 'red')
      }
    }

    await execAsync(`rm -rf ${deployTempPath}`)
    notify('Deploy successfully');
  }
}

export default new CustomDeploy()