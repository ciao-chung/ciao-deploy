const BaseCommand = require('../BaseCommand')
class FishShellSetup extends BaseCommand{
  async exec() {
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

module.exports = new FishShellSetup()