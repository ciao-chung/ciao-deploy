class Base {
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install gnome-disk-utility -y`)
    await execAsync(`sudo apt-get install openvpn -y`)
    await execAsync(`sudo yarn global add apidoc -y`)
  }
}

export default new Base()