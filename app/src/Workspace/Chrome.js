class Chrome {
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install libxss1 libappindicator1 libindicator7 -y`)
    await execAsync(`wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb`)
    await execAsync(`sudo dpkg -i google-chrome*.deb`)
    try {
      await execAsync(`sudo apt-get install -f`)
    } catch(error) {
      log(error, 'yellow')
    }
    await execAsync(`rm google-chrome-stable_current_amd64.deb`)
  }
}

export default new Chrome()