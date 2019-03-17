class Chrome {
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install libxss1 libappindicator1 libindicator7 -y`)
    await execAsync(`sudo wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -P /home`)
    try {
      await execAsync(`sudo dpkg -i /home/google-chrome*.deb`)
    } catch(error) {
      await execAsync(`sudo apt-get install -f -y`)
      log(error, 'yellow')
    }
    await execAsync(`sudo rm -rf /home/google-chrome*.deb`)
    await execAsync(`google-chrome --version`)
  }
}

export default new Chrome()