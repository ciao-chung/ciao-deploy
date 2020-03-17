import { resolve } from 'path'
class Dolphin {
  async exec() {
    try {
      const processPath = resolve('/tmp')
      await execAsync(`sudo apt-get update`)
      await execAsync(`sudo apt-get install -y build-essential cmake extra-cmake-modules kio-dev pkg-config libavformat-dev libavcodec-dev libswscale-dev`)
      await execAsync(`git clone git://anongit.kde.org/ffmpegthumbs`, { cwd: processPath })
      await execAsync(`git checkout Applications/16.04`, { cwd: resolve(processPath, 'ffmpegthumbs') })
      await execAsync(`mkdir -p builddir`, { cwd: resolve(processPath, 'ffmpegthumbs') })
      await execAsync(`cmake .. -DCMAKE_INSTALL_PREFIX=/usr -DKDE_INSTALL_QTPLUGINDIR=/usr/lib/x86_64-linux-gnu/qt5/plugins`, { cwd: resolve(processPath, 'ffmpegthumbs/builddir') })
      await execAsync(`make`, { cwd: resolve(processPath, 'ffmpegthumbs/builddir') })
      await execAsync(`sudo make install`, { cwd: resolve(processPath, 'ffmpegthumbs/builddir') })
    } catch (error) {
      log(error, 'yellow')
    }
  }
}

export default new Dolphin()