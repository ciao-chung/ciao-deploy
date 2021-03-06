import BaseCommand from 'Commands/_BaseCommand'
import os from 'os'
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

    this.argsConfig = []
    this.description = `Fish Shell`
  }

  async start() {
    log(`Fish install`)
    await this.install()
    await this.setupConfigFile()
  }

  async install() {
    const pwd = process.env.PWD
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install git -y`)
    try {
      await execAsync(`sudo apt-add-repository ppa:fish-shell/release-2 -y`)
    } catch {
      await execAsync(`sudo apt-add-repository ppa:fish-shell/release-2 -r -y`)
    }
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install fish -y`)
    await execAsync(`sudo usermod -s /usr/bin/fish ${os.userInfo().username}`)
    await execAsync(`curl -L https://get.oh-my.fish > install;`, { cwd: pwd })
    await execAsync(`fish install --path=~/.local/share/omf --config=~/.config/omf --noninteractive`, { cwd: pwd })
    await execAsync(`rm install`, { cwd: pwd })
    await execAsync(`echo "#!/bin/bash \nfish <<'END_FISH' \n omf install gitstatus \nEND_FISH" > omf-install.sh`, { cwd: pwd })
    await execAsync(`bash ./omf-install.sh`, { cwd: pwd })
    await execAsync(`rm ./omf-install.sh`, { cwd: pwd })
  }

  async setupConfigFile() {
    const homedir = os.homedir()
    const fishConfigPath = resolve(homedir, '.config/fish/')
    await execAsync(`mkdir -p ${fishConfigPath}`)
    await execAsync(`touch ${resolve(fishConfigPath, 'config.fish')}`)
    writeFileSync(
      resolve(homedir, '.config/fish/config.fish'),
      this.getFishConfig(),
      'utf-8'
    )
  }

  getFishConfig() {
    return `
alias la="php artisan"
alias clip="xclip -i -selection clipboard"
alias ..="cd ../"
alias ...="cd ../../"
alias ....="cd ../../../"
alias .....="cd ../../../../"
alias phpu="./vendor/bin/phpunit"
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