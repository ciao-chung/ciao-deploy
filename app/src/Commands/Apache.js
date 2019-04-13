import BaseCommand from 'Commands/_BaseCommand'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
class Apache extends BaseCommand{
  async setupCommand() {
    this.name = 'apache'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = []
    this.description = `初始化Apache`
  }

  async start() {
    log(`Init Apache`)
    await this.installApache()
    this.apacheConfigFilePath = '/etc/apache2/apache2.conf'
    this.apacheConfigContent = await readFileSync(this.apacheConfigFilePath, 'utf8')
    const outputFilePath = resolve('/tmp/apache2.conf')
    await this.setupHomePage()
    await this.setupSecurity()
    await writeFileSync(outputFilePath, this.apacheConfigContent, 'utf8')
    await execAsync(`sudo mv ${outputFilePath} /etc/apache2/`)
  }

  async installApache() {
    try {
      await execAsync(`sudo LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php -y`)
    } catch {
      await execAsync(`sudo LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php -r -y`)
    }
    await execAsync(`sudo apt-get update`)
    try {
      await execAsync(`sudo apt-get install libapache2-mod-php7.1 -y`)
    } catch (error) {
      log(`${error}`, 'yellow')
      await execAsync(`sudo apt-get install -y -f`)
    }
    await execAsync(`sudo a2enmod rewrite`)
    await execAsync(`sudo a2enmod headers`)
    await execAsync(`sudo a2enmod proxy`)
    await execAsync(`sudo a2enmod proxy_http`)
    await execAsync(`sudo service apache2 restart`)
  }

  async setupHomePage() {
    const outputFilePath = resolve('/tmp/index.html')
    const webRoot = resolve('/var/www/html/')
    await writeFileSync(outputFilePath, this._getDefaultHomePageContent(), 'utf8')
    await execAsync(`sudo mv index.html default-homepage.html`, { cwd: webRoot })
    await execAsync(`sudo mv ${outputFilePath} ./`, { cwd: webRoot })
  }

  async setupSecurity() {
    if(!this._isMatchApacheConfig('ServerTokens Prod')) {
      this.apacheConfigContent += '\nServerTokens Prod'
    }

    if(!this._isMatchApacheConfig('ServerSignature Off')) {
      this.apacheConfigContent += '\nServerSignature Off'
    }
  }

  _isMatchApacheConfig(string) {
    return new RegExp(string, 'g').test(this.apacheConfigContent)
  }

  _getDefaultHomePageContent() {
    return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ciao</title>
  <style>
    h1 {
      font-weight: 300;
      margin: 0;
      color: #b3b3b3;
      text-align: center;
      font-family: "Whitney B", sans-serif, monospace;
      margin-top: calc(50vh - 64px);
      font-size: 64px;
    }
  </style>
</head>
<body>
  <div>
    <h1>Ciao</h1>
  </div>
</body>
</html>
`
  }
}

export default new Apache()