import BaseCommand from 'Commands/_BaseCommand'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
class SslDelete extends BaseCommand{
  async setupCommand() {
    this.name = 'ssl-delete'
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
    this.description = `移除SSL`
  }

  async start() {
    log(`Delete SSL: ${this.args.domain}`)
    await execAsync(`sudo certbot delete --cert-name ${this.args.domain}`)
    await this.removeApacheDomainSSLRedirect(this.args.domain)
    await execAsync(`sudo service apache2 restart`)
  }

  // 移除apache設定上的SSL redirect設定
  async removeApacheDomainSSLRedirect(domain) {
    const apacheDomainConfigFilePath = resolve(`/etc/apache2/sites-available/${domain}.conf`)
    const apacheDomainConfigContent = readFileSync(apacheDomainConfigFilePath, 'utf8')
    if(!apacheDomainConfigContent) return
    const eachLine = apacheDomainConfigContent.split('/n')
    let result = ''
    for(const line of eachLine) {
      if(new RegExp(`RewriteEngine`, 'g').test(line)) continue
      if(new RegExp(`RewriteCond`, 'g').test(line)) continue
      if(new RegExp(`RewriteRule`, 'g').test(line)) continue
      result += `${line}\n`
    }

    await writeFileSync(apacheDomainConfigFilePath, result, 'utf8')
  }
}

export default new SslDelete()