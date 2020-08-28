import { resolve } from 'path'
import { writeFileSync } from 'fs'
class QueueService {
  constructor(backendConfig, backendPath) {
    this.backendConfig = backendConfig
    this.backendPath = backendPath
    if(!this.backendConfig) return
    this.queue = this.backendConfig.queue
    this.queueConfigList = []

    // 範例
    this.queueConfigListExample = [
      { appName: 'queue-default', queue: 'default' },
      { appName: 'queue-emails', queue: 'emails' },
      { appName: 'queue-sms', queue: 'sms' },
    ]
  }

  _isMultipleQueueMode() {
    if(!this.queue) return false
    return Array.isArray(this.queue.workers)
  }

  async setupConfigFile() {
    if(!this.queue) return

    // 單一worker模式
    if(this._isMultipleQueueMode() === false) {
      await this._initDefaultQueue()
    }

    // 多個worker模式
    else {
      await this._initMultipleQueues()
    }

    for(const index in this.queueConfigList) {
      let queueConfig = this.queueConfigList[index]
      // 設定檔名
      this.queueConfigList[index].filename = `queue-worker-${queueConfig.appName}.yml`
      queueConfig.filename = `queue-worker-${queueConfig.appName}.yml`
      log(`=====>>>>> Setup laravel queue(${queueConfig.queue}) config file`, 'green')
      const content = this._getQueuePm2ConfigFileContent(queueConfig.appName, queueConfig.queue)
      await execAsync(`mkdir -p ${resolve(this.backendPath, 'pm2')}`, { cwd: this.backendPath })
      const queuePm2ConfigFilePath = resolve(this.backendPath, 'pm2', queueConfig.filename)
      log(`queue service pm2 config: ${content}`, 'yellow')
      await writeFileSync(queuePm2ConfigFilePath, content, 'utf8')
    }
  }

  async _initDefaultQueue() {
    if(!this.queue) return
    if(!this.queue.appName) return
    this.queueConfigList.push({
      appName: this.queue.appName,
      queue: 'default',
    })
  }

  async _initMultipleQueues() {
    if(!Array.isArray(this.queue.workers)) return
    const validQueueConfigs = this.queue.workers.filter(queue => {
      if(!queue.appName) return false
      if(!queue.queue) return false
      return true
    })
    this.queueConfigList = this.queueConfigList.concat(validQueueConfigs)
  }

  _getQueuePm2ConfigFileContent(appName, queue = 'default') {
    return `
apps:
  - name: ${appName}
    cwd: ${this.backendConfig.path}
    script: artisan
    exec_mode: fork
    interpreter: php
    instances: 1
    args:
      - queue:work
      - --queue=${queue}
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
    if(!Array.isArray(this.queueConfigList)) return
    if(this.queueConfigList.length == 0) return
    log(`=====>>>>> Start queue service`, 'green')
    for(const queueConfig of this.queueConfigList) {
      const configFilePath = `${this.backendConfig.path}/pm2/${queueConfig.filename}`
      try {
        await this.executeRemoteBackend(`sudo pm2 delete ${queueConfig.appName}`)
      } catch(error) {
        log(error, 'yellow')
      }

      try {
        await this.executeRemoteBackend(`sudo pm2 flush ${queueConfig.appName}`)
      } catch (error) {
        log(error, 'yellow')
      }
      await this.executeRemoteBackend(`sudo pm2 start ${configFilePath} --restart-delay=1000`)
      await this.executeRemoteBackend(`sudo pm2 restart ${queueConfig.appName}`)
      await this.executeRemoteBackend(`sudo pm2 startup`)
      await this.executeRemoteBackend(`sudo pm2 save`)
    }
    notify('Setup cron queue finished')
  }
}

export default QueueService