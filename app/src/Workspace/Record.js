class Record {
  async exec() {
    await execAsync(`sudo apt-get update`)
    try {
      await execAsync(`sudo add-apt-repository ppa:peek-developers/stable -y`)
    } catch {
      await execAsync(`sudo add-apt-repository ppa:peek-developers/stable -r -y`)
    }
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install peek -y`)

    try {
      await execAsync(`sudo add-apt-repository ppa:maarten-baert/simplescreenrecorder -y`)
    } catch {
      await execAsync(`sudo add-apt-repository ppa:maarten-baert/simplescreenrecorder -r -y`)
    }
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install simplescreenrecorder -y`)
  }
}

export default new Record()