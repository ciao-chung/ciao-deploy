import { existsSync } from 'fs'
import { resolve } from 'path'
import os from 'os'
class CreateDesktopSoftLink {
  async exec() {
    this.homedir = os.homedir()
    const originDesktopPath = resolve(this.homedir, '桌面')
    const isOriginDesktopExist = existsSync(originDesktopPath)
    const desktopLinkPath = resolve(this.homedir, 'Desktop')
    const isDesktopLinkExist = existsSync(desktopLinkPath)

    if(isOriginDesktopExist == false || isDesktopLinkExist == true) return
    await execAsync(`ln -s ~/桌面 ~/Desktop`)
  }
}

export default new CreateDesktopSoftLink()