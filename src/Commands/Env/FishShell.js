import BaseCommand from '../BaseCommand'
class FishShell extends BaseCommand{
  async exec() {
    // install fish shell
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-add-repository ppa:fish-shell/release-2 -y`)
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo apt-get install fish -y`)

    // install omf
    await execAsync(`curl -L https://get.oh-my.fish > install`)
    await execAsync(`fish install --path=~/.local/share/omf --config=~/.config/omf`)
    await execAsync(`rm ./install`)
    await execAsync(`omf install gitstatus`)

    // set as default shell
    await execAsync(`sudo usermod -s /usr/bin/fish $USER`)

    // show full path in fish shell
    await execAsync(`set -U fish_prompt_pwd_dir_length 0`)

    // setup fish config
    this.writeFileSync(
      this.resolve(this.homedir, '.config/fish/config.fish'),
      this._getConfigContent(),
      'utf-8'
    )
  }

  _getConfigContent() {
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

module.exports = new FishShell()