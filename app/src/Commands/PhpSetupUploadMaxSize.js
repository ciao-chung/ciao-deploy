import BaseCommand from 'Commands/_BaseCommand'
import { existsSync } from 'fs'
class PhpSetupUploadMaxSize extends BaseCommand{
  async setupCommand() {
    this.name = 'php-setup-upload-max-size'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'size',
        description: '大小(例如: 8M, 單位不可加B)',
        required: true,
        type: 'string',
      },
    ]
    this.description = `設定PHP最大上傳檔案大小`
  }

  async start() {
    log(`Setup PHP Upload Max Size: ${this.args.size}`)
    await this.setupFile('/etc/php/7.1/cli/php.ini')
    await this.setupFile('/etc/php/7.1/apache2/php.ini')
  }

  async setupFile(file) {
    if(existsSync(file) == false) {
      log(`找不到${file}`, 'red')
      return
    }
    log(`正在設定 ${file}`)
    await execAsync(`sudo sed -i 's,^upload_max_filesize =.*$,upload_max_filesize = ${this.args.size},' ${file}`)
  }
}

export default new PhpSetupUploadMaxSize()