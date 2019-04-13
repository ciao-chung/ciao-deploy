class Media {
  async exec() {
    await execAsync(`sudo apt-get update`)

    // Simple Screen Recorder
    await execAsync(`sudo add-apt-repository ppa:maarten-baert/simplescreenrecorder -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install simplescreenrecorder -y`)

    // Peek
    await execAsync(`sudo add-apt-repository ppa:peek-developers/stable -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install peek -y`)

    // Pitivi
    await execAsync(`sudo apt-get install pitivi -y`)

    // GIMP
    await execAsync(`sudo add-apt-repository ppa:otto-kesselgulasch/gimp-edge -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install gimp gimp-gmic -y`)

    await execAsync(`sudo add-apt-repository ppa:otto-kesselgulasch/gimp-edge -y`)

    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install vlc -y`)

  }
}

export default new Media()