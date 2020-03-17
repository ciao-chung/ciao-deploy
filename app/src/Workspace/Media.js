class Media {
  async exec() {
    await execAsync(`sudo apt-get update`)

    // Simple Screen Recorder
    try {
      await execAsync(`sudo add-apt-repository ppa:maarten-baert/simplescreenrecorder -y`)
    } catch {
      await execAsync(`sudo add-apt-repository ppa:maarten-baert/simplescreenrecorder -r -y`)
    }
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install simplescreenrecorder -y`)

    // Pitivi
    await execAsync(`sudo apt-get install pitivi -y`)

    // rhythmbox
    try {
      await execAsync(`sudo add-apt-repository ppa:fossfreedom/rhythmbox -y`)
    } catch {
      await execAsync(`sudo add-apt-repository ppa:fossfreedom/rhythmbox -r -y`)
    }
    await execAsync(`sudo apt-get update`)
    try {
      await execAsync(`sudo apt-get install rhythmbox gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gnome-control-center rhythmbox-plugin-visualizer -y`)
    } catch {
      log('rhythmbox安裝失敗', 'yellow')
    }


    // GIMP
    try {
      await execAsync(`sudo add-apt-repository ppa:otto-kesselgulasch/gimp-edge -y`)
    } catch {
      await execAsync(`sudo add-apt-repository ppa:otto-kesselgulasch/gimp-edge -r -y`)
    }
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install gimp gimp-gmic -y`)

    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install vlc -y`)

    // inkscape
    await execAsync(`sudo add-apt-repository ppa:inkscape.dev/stable -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt install inkscape -y`)

  }
}

export default new Media()