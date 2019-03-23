import BaseCommand from 'Commands/_BaseCommand'
import Base from 'Env/Base'
import Php from 'Env/Php'
import Composer from 'Env/Composer'
import PhpGearman from 'Env/PhpGearman'
class Env extends BaseCommand{
  async setupCommand() {
    this.name = 'env'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'base',
        description: '基本工具(vim, curl, xclip, htop)',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'php',
        description: 'PHP 7.1',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'phpgearman',
        description: 'PHP Gearman',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'composer',
        description: 'Composer',
        defaultValue: false,
        type: 'boolean',
      },
    ]
    this.description = `基本環境安裝`
  }

  async start() {
    log(`start`)
    if(this.args.base) await Base.exec()
    if(this.args.php) await Php.exec()
    if(this.args.composer) await Composer.exec()
    if(this.args.phpgearman) await PhpGearman.exec()
  }
}

export default new Env()