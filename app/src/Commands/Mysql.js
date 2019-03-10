import BaseCommand from 'Commands/_BaseCommand'
import os from 'os'
import { spawnSync } from 'child_process'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
class Mysql extends BaseCommand{
  async setupCommand() {
    this.name = 'mysql'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'password',
        description: 'Root密碼',
        required: true,
        type: 'string',
      },
    ]
    this.description = `安裝MySQL`
  }

  async start() {
    log('install ...')
  }
}

export default new Mysql()