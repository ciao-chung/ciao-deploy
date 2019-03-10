import BaseCommand from 'Commands/_BaseCommand'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import SignDomainService from 'Service/SignDomain'
class DomainSign extends BaseCommand{
  async setupCommand() {
    this.name = 'domain-sign'
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
    ]
    this.description = `簽Domain`
  }

  async start() {
    log(`Start sign domain: ${this.args.domain}`)
    await SignDomainService.sign(this.args.domain, this.args.path)
  }
}

export default new DomainSign()