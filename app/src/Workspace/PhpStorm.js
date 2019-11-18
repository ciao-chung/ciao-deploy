import { resolve } from 'path'
import { writeFileSync } from 'fs'
class PhpStorm {
  async exec() {
    const desktopConfig = `
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
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install default-jre -y`)
    await execAsync(`wget https://download-cf.jetbrains.com/webide/PhpStorm-2017.3.4.tar.gz`)
    await execAsync(`tar xfz PhpStorm-*.tar.gz`)
    try {
      await execAsync(`sudo mv PhpStorm-17*/ /opt/phpstorm/`)
    } catch(error) {
      log(error, 'yellow')
      await execAsync(`sudo rm -rf /opt/phpstorm/`)
      await execAsync(`sudo mv PhpStorm-17*/ /opt/phpstorm/`)
    }

    await execAsync(`rm ./PhpStorm-2017.3.4.tar.gz`)

    try {
      await execAsync(`sudo ln -s /opt/phpstorm/bin/phpstorm.sh /usr/local/bin/phpstorm`)
    } catch(error) {
      log(error, 'yellow')
    }

    // Add to laucher
    try {
      await execAsync(`sudo ln -s /opt/phpstorm/bin/phpstorm.sh /usr/bin/phpstorm`)
    } catch(error) {
      log(error, 'yellow')
      await execAsync(`sudo rm /usr/bin/phpstorm`)
      await execAsync(`sudo ln -s /opt/phpstorm/bin/phpstorm.sh /usr/bin/phpstorm`)
    }
    const outputConfigFilePath = resolve('/tmp/phpstorm.desktop')
    writeFileSync(outputConfigFilePath, desktopConfig, 'utf8')
    await execAsync(`sudo mv ${outputConfigFilePath} /usr/share/applications/`)
  }
}

export default new PhpStorm()