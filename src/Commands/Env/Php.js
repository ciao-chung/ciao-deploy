const BaseCommand = require('../BaseCommand')
class Php extends BaseCommand{
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo add-apt-repository ppa:ondrej/php -y`)
    await execAsync(`php --version`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install php7.1 -y`)
    await execAsync(`sudo apt-get install php7.1-mysql -y`)
    await execAsync(`sudo apt-get install php7.1-mbstring -y`)
    await execAsync(`sudo apt-get install php7.1-mcrypt -y`)
    await execAsync(`sudo apt-get install php7.1-gd -y`)
    await execAsync(`sudo apt-get install php7.1-zip -y`)
    await execAsync(`sudo apt-get install php7.1-dom -y`)
    await execAsync(`sudo apt-get install libapache2-mod-php7.1 -y`)
    await execAsync(`sudo service apache2 restart`)
  }
}

module.exports = new Php()