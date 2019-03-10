import BaseCommand from 'Commands/_BaseCommand'
import Base from 'Workspace/Base'
import Chrome from 'Workspace/Chrome'
import CreateDesktopSoftLink from 'Workspace/CreateDesktopSoftLink'
import Dolphin from 'Workspace/Dolphin'
import Media from 'Workspace/Media'
import Ngrok from 'Workspace/Ngrok'
import PhpStorm from 'Workspace/PhpStorm'
import Record from 'Workspace/Record'
import Unetbootin from 'Workspace/Unetbootin'
import DbEaver from 'Workspace/DbEaver'
class Workspace extends BaseCommand{
  async setupCommand() {
    this.name = 'workspace'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'base',
        description: '安裝基本工具(gnome-disk-utility、apidoc、openvpn)',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'chrome',
        description: '安裝Google Chrome',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'desktop',
        description: '設定桌面Soft Link',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'dolphin',
        description: '設定Dolphin檔案管理',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'media',
        description: '安裝多媒體相關工具',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'ngrok',
        description: '安裝Ngrok',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'phpstorm',
        description: '安裝PHP Storm',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'record',
        description: '安裝螢幕錄影工具',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'unetbootin',
        description: '安裝Unetbootin',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'dbeaver',
        description: '安裝DBeaver',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'all',
        description: '全部設定、安裝',
        defaultValue: false,
        type: 'boolean',
      },
    ]
    this.description = `工作環境設定`
  }

  async start() {
    log(`Start setup workspace`)

    this.jobs = {
      base: Base.exec,
      chrome: Chrome.exec,
      desktop: CreateDesktopSoftLink.exec,
      dolphin: Dolphin.exec,
      media: Media.exec,
      ngrok: Ngrok.exec,
      phpstorm: PhpStorm.exec,
      record: Record.exec,
      unetbootin: Unetbootin.exec,
      dbeaver: DbEaver.exec,
    }

    if(this.args.all) {
      await this.startAllJobs()
    }

    else {
      await this.startJobs()
    }
  }

  async startJobs() {
    for(const jobName in this.jobs) {
      if(!this.args[jobName]) continue
      await this.jobs[jobName]()
    }
  }

  async startAllJobs() {
    for(const jobName in this.jobs) {
      await this.jobs[jobName]()
    }
  }
}

export default new Workspace()