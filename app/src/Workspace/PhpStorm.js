import { resolve } from 'path'
import { writeFileSync } from 'fs'
class PhpStorm {
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install default-jre -y`)
    await execAsync(`wget https://download-cf.jetbrains.com/webide/PhpStorm-2017.3.4.tar.gz`)
    await execAsync(`tar xfz PhpStorm-*.tar.gz`)
    await execAsync(`sudo mv PhpStorm-17*/ /opt/phpstorm/`)
    await execAsync(`rm ./PhpStorm-2017.3.4.tar.gz`)
    await execAsync(`sudo ln -s /opt/phpstorm/bin/phpstorm.sh /usr/local/bin/phpstorm`)

    // Add to laucher
    await execAsync(`sudo ln -s /opt/phpstorm/bin/phpstorm.sh /usr/bin/phpstorm`)
    const outputConfigFilePath = resolve('/tmp/phpstorm.desktop')
    const config = this._getDesktopConfig()
    writeFileSync(outputConfigFilePath, config, 'utf8')
    await execAsync(`sudo mv ${outputConfigFilePath} /usr/share/applications/`)
  }

  _getDesktopConfig() {
    return `
[Desktop Entry]
Version=5.0.4
Name=PhpStorm
GenericName=Text Editor

Exec=phpstorm
Terminal=false
Icon=/opt/phpstorm/bin/phpstorm.png
Type=Application
Categories=TextEditor;IDE;Development
X-Ayatana-Desktop-Shortcuts=NewWindow

[NewWindow Shortcut Group]
Name=New Window
Exec=phpstorm
TargetEnvironment=Unity
`
  }
}

export default new PhpStorm()