const BaseCommand = require('../BaseCommand')
class Dophin extends BaseCommand{
  async exec() {
    const processPath = this.resolve('/tmp')
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install -y build-essential cmake extra-cmake-modules kio-dev pkg-config libavformat-dev libavcodec-dev libswscale-dev`)
    await execAsync(`git clone git://anongit.kde.org/ffmpegthumbs`, { cwd: processPath })
    await execAsync(`git checkout Applications/16.04`, { cwd: this.resolve(processPath, 'ffmpegthumbs') })
    await execAsync(`mkdir -p builddir`, { cwd: this.resolve(processPath, 'ffmpegthumbs') })
    await execAsync(`cmake .. -DCMAKE_INSTALL_PREFIX=/usr -DKDE_INSTALL_QTPLUGINDIR=/usr/lib/x86_64-linux-gnu/qt5/plugins`, { cwd: this.resolve(processPath, 'ffmpegthumbs/builddir') })
    await execAsync(`make`, { cwd: this.resolve(processPath, 'ffmpegthumbs/builddir') })
    await execAsync(`sudo make install`, { cwd: this.resolve(processPath, 'ffmpegthumbs/builddir') })
  }
}

module.exports = new Dophin()