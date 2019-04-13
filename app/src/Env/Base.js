class Base {
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install vim -y`)
    await execAsync(`sudo apt-get install git -y`)
    await execAsync(`git config --global core.editor vim`)
    await execAsync(`sudo apt-get install tig -y`)
    await execAsync(`sudo apt-get install curl -y`)
    await execAsync(`sudo apt-get install xclip -y`)
    await execAsync(`sudo apt-get install htop -y`)
  }
}

export default new Base()