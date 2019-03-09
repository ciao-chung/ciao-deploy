import BaseCommand from 'Commands/_BaseCommand'
import { homedir } from 'os'
import { spawnSync } from 'child_process'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
class Fish extends BaseCommand{
  async setupCommand() {
    this.name = 'fish'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'install',
        description: 'install',
        defaultValue: false,
        type: 'boolean',
      },
      {
        name: 'install',
        description: 'install',
        defaultValue: false,
        type: 'boolean',
      },
    ]
    this.description = `Fish Shell`
  }

  async start() {
    log(`fish install`)
    try {
      await this.install()
    } catch (error) {
      log(error, 'red')
    }

    log(`omf`)
    try {
      await this.omf()
    } catch (error) {
      log(error, 'red')
    }

    writeFileSync(
      resolve(homedir, '.config/fish/config.fish'),
      this.getFishConfig(),
      'utf-8'
    )
  }

  async install() {
    await execAsync(`apt-get update`)
    await execAsync(`apt-get install git -y`)
    await execAsync(`apt-add-repository ppa:fish-shell/release-2 -y`)
    await execAsync(`apt-get update`)
    spawnSync('apt-get install fish -y', [], { shell: true });
    await execAsync(`fish --version`)
  }

  async omf() {
    await execAsync(`curl -L https://get.oh-my.fish > install`)
    spawnSync('fish', ['install', '--path=~/.local/share/omf', '--config=~/.config/omf'], { shell: true });
    await execAsync(`rm ./install`)
    spawnSync('omf', ['install', 'gitstatus'], { shell: true });
    await execAsync(`usermod -s /usr/bin/fish $USER`)
  }

  getFishConfig() {
    return `
alias la="php artisan"
alias clip="xclip -i -selection clipboard"
alias ..="cd ../"
alias ...="cd ../../"
alias ....="cd ../../../"
alias .....="cd ../../../../"
alias phpunit="./vendor/bin/phpunit"
alias sf="app/console"
alias sshsample="ssh -o StrictHostKeyChecking=no username@host.com"

set -g theme_powerline_fonts no
set -g theme_nerd_fonts no
set -g fish_prompt_pwd_dir_length 0
set -g theme_color_scheme base16-light
`
  }

}

export default new Fish()