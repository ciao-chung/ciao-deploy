class Git{
  async exec() {
    await execAsync(`apt-get update`)
    await execAsync('apt-get install git -y')
    await execAsync('apt-get install tig -y')
  }
}

module.exports = new Git()