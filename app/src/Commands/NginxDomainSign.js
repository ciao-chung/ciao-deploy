import BaseCommand from 'Commands/_BaseCommand'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import SignDomainService from 'Service/NginxSignDomain'
class DomainSign extends BaseCommand{
  async setupCommand() {
    this.name = 'nginx-domain-sign'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'domain',
        description: 'Domain',
        required: true,
        type: 'string',
      },
      {
        name: 'path',
        description: 'Web路徑',
        required: true,
        type: 'string',
      },
      {
        name: 'ssl',
        description: '是否使用SSL',
        required: false,
        type: 'boolean',
      },
      {
        name: 'ssl',
        description: '是否使用SSL',
        required: false,
        type: 'boolean',
      },
      {
        name: 'spa',
        description: '是否為SPA',
        required: false,
        type: 'boolean',
      },
    ]
    this.description = `設定Nginx Virtual Host`
  }

  async start() {
    log(`Start sign nginx domain: ${this.args.domain}`)
    await SignDomainService.sign(
      this.args.domain,
      this.args.path,
      this.args.ssl,
      this.args.spa,
    )
  }
}

export default new DomainSign()