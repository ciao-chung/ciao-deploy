import { resolve } from 'path'
import { existsSync, writeFileSync, readFileSync } from 'fs'
import mustache from 'mustache'
class NginxSignDomain {
  async sign(domain, path, ssl, spa) {
    if(!existsSync(path)) {
      log(`Domain設定失敗, 找不到web路徑`, 'red')
      return
    }

    if(ssl) {
      try {
        await execAsync(`certbot --help`)
      } catch(error) {
        log('Domain設定失敗, 請確認是否安裝certbot', 'red')
        return
      }
    }

    const nginxConfig = this._getConfigContent(ssl, spa)
  }

  async _getConfigContent(ssl, spa) {
    const template = this._getConfigTemplate(ssl, spa)
    const configContent = mustache.render(template, {
      domain,
      path,
    })
    return configContent
  }

  async _getConfigTemplate(ssl, spa) {
    let filename = null
    if(ssl == true && spa === true) filename = 'site-ssl-spa.conf'
    if(ssl == true && spa === false) filename = 'site-ssl-php.conf'
    if(ssl == false && spa === true) filename = 'site-spa.conf'
    if(ssl == false && spa === false) filename = 'site-php.conf'
    const path = resolve(__dirname, 'nginx', filename)
    const result = readFileSync(path, { encoding: 'utf-8'})
    return result
  }
}

export default new NginxSignDomain()