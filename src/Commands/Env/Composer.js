const BaseCommand = require('../BaseCommand')
class Composer extends BaseCommand{
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"`)
    await execAsync(`php composer-setup.php`)
    await execAsync(`php -r "unlink('composer-setup.php');"`)
    await execAsync(`sudo mv composer.phar /usr/local/bin/composer`)
    await execAsync(`composer`)
  }
}

module.exports = new Composer()