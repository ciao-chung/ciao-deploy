import { resolve } from 'path'
import { existsSync, writeFileSync, readFileSync } from 'fs'
import NginxSiteConfig from 'Nginx/NginxSiteConfig.js'
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
    
    this._checkIsFirstTime()
    const nginxConfig = await this._getConfigContent()
    
    if(this.first) {
      await this._createNginxConfig(nginxConfig)
      await this.enableSite(nginxConfig)
    }
    
    await this._setupSsl()
    await this._createNginxConfig(nginxConfig)
    await execAsync(`sudo service nginx restart`)
  }
  
  async _checkIsFirstTime() {
    this.first = !existsSync(`/etc/nginx/sites-available/${this.domain}.conf`)
  }
  
  async enableSite() {
    try {
      await execAsync(`sudo ln -s /etc/nginx/sites-available/${this.domain}.conf /etc/nginx/sites-enabled/${this.domain}.conf`)
    } catch (error) {
      log(error, 'yellow')
      log(`${this.domain}啟用失敗`, 'red')
    }
  }

  async _setupSsl() {
    if(!this.ssl) return
    await existsSync(`sudo certbot --nginx --redirect --keep-until-expiring --no-eff-email --agree-tos --domains ${this.domain}`)
  }

  async _createNginxConfig(content) {
    await execAsync(`mkdir -p /tmp/ciao-deploy`)
    const tempPath = `/tmp/ciao-deploy/${this.domain}.conf`
    writeFileSync(tempPath, content, 'utf-8')
    await execAsync(`sudo mv ${tempPath} /etc/nginx/sites-available/${this.domain}.conf`)
  }

  async _getConfigContent() {
    let content = null
    if(this.ssl == true && this.spa === true) {
      content = NginxSiteConfig.siteSslSpa(this.path, this.domain)
    }

    else if(this.ssl == true && this.spa === false) {
      content = NginxSiteConfig.siteSslPhp(this.path, this.domain)
    }

    else if(this.ssl == false && this.spa === true) {
      content = NginxSiteConfig.siteSpa(this.path, this.domain)
    }

    else if(this.ssl == false && this.spa === false) {
      content = NginxSiteConfig.sitePhp(this.path, this.domain)
    }
    return content
  }
}

export default new NginxSignDomain()