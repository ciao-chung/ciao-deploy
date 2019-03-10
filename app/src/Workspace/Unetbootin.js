class Unetbootin {
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo add-apt-repository ppa:gezakovacs/ppa -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install unetbootin -y`)
  }
}

export default new Unetbootin()