const BaseCommand = require('../BaseCommand')
class PhpGearman extends BaseCommand{
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-add-repository ppa:ondrej/pkg-gearman -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install php-gearman -y`)
    await execAsync(`sudo apt-get install gearman-job-server -y`)
    await execAsync(`sudo service gearman-job-server restart`)
  }
}

module.exports = new PhpGearman()