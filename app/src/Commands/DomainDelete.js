import BaseCommand from 'Commands/_BaseCommand'
class DomainDelete extends BaseCommand{
  async setupCommand() {
    this.name = 'domain-delete'
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
    ]
    this.description = `刪除Domain`
  }

  async start() {
    log(`Start delete domain: ${this.args.domain}`)

    await execAsync(`sudo a2dissite ${this.args.domain}`)
    await execAsync(`sudo find /etc/apache2/ -name "${this.args.domain}*.conf"`)
    await execAsync(`sudo find /etc/apache2/ -name "${this.args.domain}*.conf" -delete`)
    await execAsync(`sudo service apache2 restart`)
  }
}

export default new DomainDelete()