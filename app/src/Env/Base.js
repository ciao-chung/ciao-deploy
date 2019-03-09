class Base {
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install vim -y`)
    await execAsync(`sudo apt-get install curl -y`)
    await execAsync(`sudo apt-get install xclip -y`)
  }
}

export default new Base()