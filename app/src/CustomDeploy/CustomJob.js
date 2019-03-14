import { resolve } from 'path'
class CustomJob {
  constructor(jobName, jobConfig) {
    this.name = jobName
    this.config = jobConfig
    this.rsync = this.config.rsync
    this.jobTempPath = resolve(deployTempPath, this.name)
  }

  async execute() {
    mkdir('-p', this.jobTempPath)
    if(this.config.description) log(`\n[${this.config.description}]`, 'yellow')
    for(const command of this.config.execute) {
      log(`${command}`)
      await execAsync(command, { cwd: this.jobTempPath })
    }

    if(this.rsync) await this.startRsync()
  }

  async executeRemote(command) {
    await executeRemote(this.rsync.user, this.rsync.host, command, { cwd: this.jobTempPath })
  }

  async startRsync() {
    const rsyncCommand = `rsync -e "ssh -o StrictHostKeyChecking=no" -avzh ${this.jobTempPath}/ ${this.rsync.user}@${this.rsync.host}:${this.rsync.path}`
    log(rsyncCommand)
    await executeAsync(rsyncCommand)

    if(!Array.isArray(this.rsync.execute)) return
    for(const remoteCommand of this.rsync.execute) {
      log(`${remoteCommand}`)
      await this.executeRemote()
    }
  }
}

export default (jobName, jobConfig) => new CustomJob(jobName, jobConfig)