import BaseCommand from 'Commands/_BaseCommand'
class SslSign extends BaseCommand{
  async setupCommand() {
    this.name = 'ssl-sign'
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
        name: 'email',
        description: 'Let\'s Encrypt通知信箱',
        required: true,
        type: 'string',
      },
    ]
    this.description = `簽SSL`
  }

  async start() {
    log(`Sign SSL: ${this.args.domain}`)

    const apacheConfigFilePath = this.resolve(`/etc/apache2/sites-available/${this.args.domain}.conf`)
    if(!this.existsSync(apacheConfigFilePath)) {
      log(`簽SSL失敗, 找不到該domain ( ${this.args.domain} )的apache設定`, 'red')
      return
    }

    await execAsync(`sudo certbot --apache --redirect --keep-until-expiring --no-eff-email --agree-tos --email ${this.args.email} --domains ${this.args.domain}` )
  }
}

export default new SslSign()