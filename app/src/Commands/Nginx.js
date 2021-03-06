import BaseCommand from 'Commands/_BaseCommand'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
class Nginx extends BaseCommand{
  async setupCommand() {
    this.name = 'nginx'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'install',
        description: '安裝Nginx',
        required: false,
        type: 'boolean',
      },
    ]
    this.description = `初始化Nginx`
  }

  async start() {
    log(`Init Nginx`)
    if(this.args.install) await this.installNginx()
    await this.setupDefaultPage()
    await this.setupNginxConf()
    await this.setupNginxDefaultSitesAvailableConf()
    await this.initPhpFpm()
    await execAsync(`sudo service nginx restart`)
  }

  async installNginx() {
    await execAsync(`sudo apt-get install nginx -y`)
    await execAsync(`sudo apt-add-repository -y ppa:hda-me/nginx-stable -y`)
    await execAsync(`sudo apt-get update -y`)
    await execAsync(`sudo apt-get install nginx-module-brotli -y`)
    await execAsync(`sudo add-apt-repository ppa:certbot/certbot -y`)
    await execAsync(`sudo apt-get update -y`)
    await execAsync(`sudo apt-get install python-certbot-nginx -y`)
    await execAsync(`sudo mkdir -p /ciao-deploy/origin`)
    await execAsync(`sudo cp -r /etc/nginx/nginx.conf /ciao-deploy/origin/nginx.conf`)
    await execAsync(`sudo cp -r /etc/nginx/sites-available/default.conf /ciao-deploy/origin/default`)

    try {
      await execAsync(`sudo service nginx restart`)
    } catch (error) {
      log('nginx server重啟失敗, 確認是否安裝nginx', 'yellow')
    }
  }

  async setupDefaultPage() {
    log(`正在設定 /var/www/html/index.html`)
    const path = resolve(__dirname, 'nginx', 'default.html')
    const result = readFileSync(path, { encoding: 'utf-8'})
    await execAsync(`mkdir -p /tmp/ciao-deploy`)
    const tempPath = '/tmp/ciao-deploy/nginx-index.html'
    writeFileSync(tempPath, result, 'utf-8')
    await execAsync(`sudo mv ${tempPath} /var/www/html/index.html`)
  }

  async setupNginxConf() {
    log(`正在設定 /etc/nginx/nginx.conf`)
    const path = resolve(__dirname, 'nginx', 'nginx.conf')
    const result = readFileSync(path, { encoding: 'utf-8'})
    await execAsync(`mkdir -p /tmp/ciao-deploy`)
    const tempPath = '/tmp/ciao-deploy/nginx.conf'
    writeFileSync(tempPath, result, 'utf-8')
    await execAsync(`sudo mv ${tempPath} /etc/nginx/nginx.conf`)
  }

  async setupNginxDefaultSitesAvailableConf() {
    log(`正在設定 /etc/nginx/sites-available/default.conf`)
    const path = resolve(__dirname, 'nginx', 'default.conf')
    const result = readFileSync(path, { encoding: 'utf-8'})
    await execAsync(`mkdir -p /tmp/ciao-deploy`)
    const tempPath = '/tmp/ciao-deploy/nginx-default.conf'
    writeFileSync(tempPath, result, 'utf-8')
    await execAsync(`sudo mv ${tempPath} /etc/nginx/sites-available/default.conf`)
  }

  async initPhpFpm() {
    if(!existsSync(`/etc/php/7.1/fpm/pool.d/www.conf`)) return
    log(`正在設定 /etc/php/7.1/fpm/pool.d/www.conf`)
    const path = resolve(__dirname, 'php-fpm', 'www.conf')
    const result = readFileSync(path, { encoding: 'utf-8'})
    await execAsync(`mkdir -p /tmp/ciao-deploy`)
    const tempPath = '/tmp/ciao-deploy/php-fpm-www.conf'
    writeFileSync(tempPath, result, 'utf-8')
    await execAsync(`sudo mv ${tempPath} /etc/php/7.1/fpm/pool.d/www.conf`)
  }
}

export default new Nginx()