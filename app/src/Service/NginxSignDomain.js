import { resolve } from 'path'
import { existsSync, writeFileSync, readFileSync } from 'fs'
import mustache from 'mustache'
class NginxSignDomain {
  async sign(domain, path, ssl, spa) {
    this.domain = domain
    this.path = path
    this.ssl = ssl
    this.spa = spa
    if(!existsSync(path)) {
      log(`Domain設定失敗, 找不到web路徑`, 'red')
      return
    }

    if(this.ssl) {
      try {
        await execAsync(`certbot --help`)
      } catch(error) {
        log('Domain設定失敗, 請確認是否安裝certbot', 'red')
        return
      }
    }

    const nginxConfig = await this._getConfigContent()
    await this._createNginxConfig(nginxConfig)
    await this._setupSsl()
    await this._createNginxConfig(nginxConfig)
  }

  async _setupSsl() {
    if(!this.ssl) return
    await existsSync(`sudo certbot --nginx --redirect --keep-until-expiring --no-eff-email --agree-tos --domains ${this.domain}`)
  }

  async _createNginxConfig(content) {
    const tempPath = `/tmp/ciao-deploy/${this.domain}.conf`
    writeFileSync(tempPath, content, 'utf-8')
    await execAsync(`sudo mv ${tempPath} /etc/nginx/sites-available/${this.domain}.conf`)
  }

  async _getConfigContent() {
    const template = this._getConfigTemplate()
    const configContent = mustache.render(template, {
      domain: this.domain,
      path: this.path,
    })
    return configContent
  }

  async _getConfigTemplate() {
    let filename = null
    if(this.ssl == true && this.spa === true) filename = 'site-ssl-spa.conf'
    if(this.ssl == true && this.spa === false) filename = 'site-ssl-php.conf'
    if(this.ssl == false && this.spa === true) filename = 'site-spa.conf'
    if(this.ssl == false && this.spa === false) filename = 'site-php.conf'
    const path = resolve(__dirname, 'nginx', filename)
    const result = readFileSync(path, { encoding: 'utf-8'})
    return result
  }
}

export default new NginxSignDomain()