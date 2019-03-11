import BaseCommand from 'Commands/_BaseCommand'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import SignDomainService from 'Service/SignDomain'
class DomainProxy extends BaseCommand{
  async setupCommand() {
    this.name = 'domain-proxy'
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
        name: 'port',
        description: '要轉的port',
        required: true,
        type: 'string',
      },
    ]
    this.description = `簽Proxy Domain`
  }

  async start() {
    log(`Start sign domain: ${this.args.domain}`)
    await SignDomainService.proxy(this.args.domain, this.args.port)
  }
}

export default new DomainProxy()