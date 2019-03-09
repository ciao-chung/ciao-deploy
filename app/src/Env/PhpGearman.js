class PhpGearman {
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo LC_ALL=C.UTF-8 apt-add-repository ppa:ondrej/pkg-gearman -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install php-gearman -y`)
    await execAsync(`sudo apt-get install gearman-job-server -y`)
    await execAsync(`sudo service gearman-job-server restart`)
  }
}

export default new PhpGearman()