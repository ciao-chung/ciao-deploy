import BaseCommand from 'Commands/_BaseCommand'
class NginxDomainDelete extends BaseCommand{
  async setupCommand() {
    this.name = 'nginx-domain-delete'
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
    this.description = `刪除Nginx Domain`
  }

  async start() {
    log(`Start delete domain: ${this.args.domain}`)

    await execAsync(`sudo rm -rf /etc/nginx/sites-enabled/${this.args.domain}.conf`)
    await execAsync(`sudo rm -rf /etc/nginx/sites-available/${this.args.domain}.conf`)
    await execAsync(`sudo rm -rf /etc/letsencrypt/live/nginx-web.ciao-chung.com`)
    await execAsync(`sudo rm -rf /etc/letsencrypt/archive/nginx-web.ciao-chung.com`)
    await execAsync(`sudo nginx -t`)
    await execAsync(`sudo service nginx restart`)
  }
}

export default new NginxDomainDelete()