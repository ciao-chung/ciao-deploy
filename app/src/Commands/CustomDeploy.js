import BaseCommand from 'Commands/_BaseCommand'
import { resolve } from 'path'
import prettyjson from 'prettyjson'
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
      const job = this.commandConfig.deploy[jobName]
      await this.startJob(jobName, job)
    }

    await execAsync(`rm -rf ${deployTempPath}`)
    notify('Deploy successfully');
  }

  async startJob(jobName, job) {
    const jobTempPath = resolve(deployTempPath, jobName)
    mkdir('-p', jobTempPath)
    if(job.description) log(`\n[${job.description}]`, 'yellow')
    for(const command of job.execute) {
      log(`${command}`)
      await execAsync(command, { cwd: jobTempPath })
    }

    if(job.rsync) await this.rsync(job.rsync, jobTempPath)
  }

  async rsync(rsyncConfig, jobTempPath) {
    const rsyncCommand = `rsync -e "ssh -o StrictHostKeyChecking=no" -avzh ${jobTempPath}/ ${rsyncConfig.user}@${rsyncConfig.host}:${rsyncConfig.path}`
    log(rsyncCommand)
    // await executeAsync(rsyncCommand)

    if(!Array.isArray(rsyncConfig.execute)) return
    for(const remoteCommand of rsyncConfig.execute) {
      log(`${remoteCommand}`)
      // await executeRemote(rsyncConfig.user, rsyncConfig.host, remoteCommand, { cwd: jobTempPath })
    }

  }
}

export default new CustomDeploy()