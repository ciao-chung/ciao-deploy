class DbEaver {
  async exec() {
    try {
      await execAsync(`sudo LC_ALL=C.UTF-8 add-apt-repository ppa:webupd8team/java -y`)
    } catch {
      await execAsync(`sudo LC_ALL=C.UTF-8 add-apt-repository ppa:webupd8team/java -r -y`)
    }
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install oracle-java8-set-default -y`)
    await execAsync(`java -version`)
    await execAsync(`sudo apt install default-jdk -y`)
    await execAsync(`wget -O - https://dbeaver.io/debs/dbeaver.gpg.key | sudo apt-key add -`)
    await execAsync(`echo "deb https://dbeaver.io/debs/dbeaver-ce /" | sudo tee /etc/apt/sources.list.d/dbeaver.list`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt -y  install dbeaver-ce
`)
  }
}

export default new DbEaver()