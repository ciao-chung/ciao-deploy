import { resolve } from 'path'
class CustomJob {
  constructor(jobName, jobConfig) {
    this.name = jobName
    this.config = jobConfig
    this.remote = this.config.remote
    this.jobTempPath = resolve(deployTempPath, this.name)
  }

  async execute() {
    mkdir('-p', this.jobTempPath)
    if(this.config.description) log(`\n[${this.config.description}]`, 'yellow')
    for(const command of this.config.execute) {
      log(`${command}`)
      await execAsync(command, { cwd: this.jobTempPath })
    }

    if(this.remote) await this.startRemoteJob()
  }

  async startRemoteJob() {
    if(this.remote.rsync == true) await this.rsync()

    if(args.first == true) await this.executeRemoteCommands(this.remote.first_execute)
    await this.executeRemoteCommands(this.remote.execute)
  }

  async executeRemoteCommands(commands) {
    if(!Array.isArray(commands)) return
    for(const command of commands) {
      log(`${command}`)
      try {
        await this.executeRemote(command)
      } catch (error) {
        log(`Remote command fail`, 'yellow')
        log(error, 'yellow')
      }
    }
  }

  async executeRemote(command) {
    await executeRemote(this.remote.user, this.remote.host, command, { cwd: this.jobTempPath })
  }

  async rsync() {
    await this.executeRemote(`mkdir -p ${this.remote.path}`)
    const rsyncCommand = `rsync -e "ssh -o StrictHostKeyChecking=no" -avzh ${this.jobTempPath}/ ${this.remote.user}@${this.remote.host}:${this.remote.path}`
    log(rsyncCommand)
    await execAsync(rsyncCommand)
  }
}

export default (jobName, jobConfig) => new CustomJob(jobName, jobConfig)