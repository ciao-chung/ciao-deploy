class Php {
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install imagemagick -y`)
    await execAsync(`sudo apt-get update`)
    try {
      await execAsync(`sudo LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php -y`)
    } catch {
      await execAsync(`sudo LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php -r -y`)
    }
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install php7.1 -y`)
    await execAsync(`php --version`)
    await execAsync(`sudo apt-get install php7.1-mysql -y`)
    await execAsync(`sudo apt-get install php7.1-mbstring -y`)
    await execAsync(`sudo apt-get install php7.1-mcrypt -y`)
    await execAsync(`sudo apt-get install php7.1-gd -y`)
    await execAsync(`sudo apt-get install php7.1-zip -y`)
    await execAsync(`sudo apt-get install php7.1-dom -y`)
    await execAsync(`sudo apt-get install php7.1-xml -y`)
    await execAsync(`sudo apt-get install php7.1-curl -y`)
    await execAsync(`sudo apt-get install php7.1-bcmath -y`)
    await execAsync(`sudo apt-get install php7.1-xdebug -y`)
    await execAsync(`sudo apt-get install php7.1-fpm -y`)
    await execAsync(`sudo apt-get install php-imagick -y`)
    await execAsync(`sudo apt-get install php-redis -y`)
    await execAsync(`php -m | grep imagick`)
  }
}

export default new Php()