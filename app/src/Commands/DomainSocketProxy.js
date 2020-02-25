import BaseCommand from 'Commands/_BaseCommand'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import SignDomainService from 'Service/SignDomain'
class DomainSocketProxy extends BaseCommand{
  async setupCommand() {
    this.name = 'domain-socket-proxy'
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
        description: 'Socket port',
        required: true,
        type: 'string',
      },
    ]
    this.description = `簽Socket Proxy Domain`
  }

  async start() {
    log(`Start sign domain: ${this.args.domain}`)
    await SignDomainService.socketProxy(this.args.domain, this.args.port)
  }
}

export default new DomainSocketProxy()