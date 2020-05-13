import { resolve } from 'path'
import { writeFileSync } from 'fs'
class QueueService {
  constructor(backendConfig, backendPath) {
    this.backendConfig = backendConfig
    this.backendPath = backendPath
    if(!this.backendConfig) return
    this.queue = this.backendConfig.queue
  }

  async setupConfigFile() {
    if(!this.queue) return
    if(!this.queue.appName) return
    log(`=====>>>>> Setup laravel queue config file`, 'green')
    const content = this._getQueuePm2ConfigFileContent()
    await execAsync(`mkdir -p ${resolve(this.backendPath, 'pm2')}`, { cwd: this.backendPath })
    const queuePm2ConfigFilePath = resolve(this.backendPath, 'pm2', 'queue-worker.yml')
    log(`queue service pm2 config: ${content}`, 'yellow')
    await writeFileSync(queuePm2ConfigFilePath, content, 'utf8')
  }

  _getQueuePm2ConfigFileContent() {
    return `
apps:
  - name: ${this.queue.appName}
    cwd: ${this.backendConfig.path}
    script: artisan
    exec_mode: fork
    interpreter: php
    instances: 1
    args:
      - queue:work
      - --tries=5
      - --sleep=5
    `
  }

  async executeRemoteBackend(command, options) {
    if(this.backendConfig.local) {
      await execAsync(command, options)
      return
    }
    await executeRemote(this.backendConfig.user, this.backendConfig.host, command, options)
  }

  async startService() {
    if(!this.queue) return
    if(!this.queue.appName) return
    log(`=====>>>>> Start queue service`, 'green')
    const configFilePath = `${this.backendConfig.path}/pm2/queue-worker.yml`

    try {
      await this.executeRemoteBackend(`sudo pm2 delete ${this.queue.appName}`)
    } catch(error) {
      log(error, 'yellow')
    }

    await this.executeRemoteBackend(`sudo pm2 flush ${this.queue.appName}`)
    await this.executeRemoteBackend(`sudo pm2 start ${configFilePath} --restart-delay=1000`)
    await this.executeRemoteBackend(`sudo pm2 restart ${this.queue.appName}`)
    await this.executeRemoteBackend(`sudo pm2 startup`)
    await this.executeRemoteBackend(`sudo pm2 save`)
    notify('Setup cron queue finished')
  }
}

export default QueueService