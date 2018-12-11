const BaseCommand = require('../BaseCommand')
class CreateDesktopSoftLink extends BaseCommand{
  async exec() {
    const originDesktopPath = this.resolve(this.homedir, '桌面')
    const isOriginDesktopExist = this.existsSync(originDesktopPath)
    const desktopLinkPath = this.resolve(this.homedir, 'Desktop')
    const isDesktopLinkExist = this.existsSync(desktopLinkPath)

    if(isOriginDesktopExist == false || isDesktopLinkExist == true) return
    await execAsync(`ln -s ~/桌面 ~/Desktop`)
  }
}

module.exports = new CreateDesktopSoftLink()