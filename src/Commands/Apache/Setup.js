const BaseCommand = require('../BaseCommand')
class Setup extends BaseCommand{
  async exec() {
    this.apacheConfigFilePath = '/etc/apache2/apache2.conf'
    this.apacheConfigContent = await this.readFileSync(this.apacheConfigFilePath, 'utf8')
    const outputFilePath = this.resolve('/tmp/apache2.conf')
    await this.setupHomePage()
    await this.setupSecurity()
    await this.writeFileSync(outputFilePath, this.apacheConfigContent, 'utf8')
    await execAsync(`sudo mv ${outputFilePath} /etc/apache2/`)
  }

  async setupHomePage() {
    const outputFilePath = this.resolve('/tmp/index.html')
    const webRoot = this.resolve('/var/www/html/')
    await this.writeFileSync(outputFilePath, this._getDefaultHomePageContent(), 'utf8')
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

module.exports = new Setup()