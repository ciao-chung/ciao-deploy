import BaseCommand from 'Commands/_BaseCommand'
import os from 'os'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
class Fish extends BaseCommand{
  async setupCommand() {
    this.name = 'oh-my-fish'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'theme',
        description: '主題(gitstatus/bobthefish), 預設為gitstatus',
        required: true,
        type: 'string',
      },
    ]

    // 可參考oh my fish官方文件: https://github.com/oh-my-fish/oh-my-fish/blob/master/docs/Themes.md
    this.description = `Oh My Fish主題設定`
  }

  async start() {
    log(`Fish theme install`)
    await this.init()
    await this.install()
    await this.setupConfigFile()
  }

  async init() {
    this.allowThemes = ['gitstatus', 'bobthefish']
    const valid = this.allowThemes.includes(this.args.theme)
    this.theme = valid ? this.args.theme : 'gitstatus'
  }

  async install() {
    const pwd = process.env.PWD
    log(`Start install fish theme: ${this.theme}`, 'green')
    await execAsync(`echo "#!/bin/bash \nfish <<'END_FISH' \n omf install ${this.theme} \nEND_FISH" > omf-install.sh`, { cwd: pwd })
    try {
      await execAsync(`bash ./omf-install.sh`, { cwd: pwd })
    } catch (error) {
      log(error, 'yellow')
    }
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
    const baseConfig = this.getBaseFishConfig()
    const themeConfig = this.getThemeConfig()
    return `${baseConfig}

${themeConfig}
`
  }

  getThemeConfig() {
    // https://github.com/oh-my-fish/oh-my-fish/blob/master/docs/Themes.md#bobthefish
    if(this.theme === 'bobthefish') {
      return `
set -g theme_display_git yes
set -g theme_display_git_untracked yes
set -g theme_display_git_ahead_verbose yes
set -g theme_git_worktree_support yes
set -g theme_display_vagrant yes
set -g theme_display_docker_machine no
set -g theme_display_hg yes
set -g theme_display_virtualenv no
set -g theme_display_ruby no
set -g theme_display_user yes
set -g theme_display_vi no
set -g theme_display_date no
set -g theme_display_cmd_duration yes
set -g theme_title_display_process yes
set -g theme_title_display_path no
set -g theme_title_use_abbreviated_path no
set -g theme_date_format "+%a %H:%M"
set -g theme_avoid_ambiguous_glyphs yes
set -g theme_powerline_fonts no
set -g theme_nerd_fonts yes
set -g theme_show_exit_status yes
set -g default_user your_normal_user
set -g theme_color_scheme dark
set -g fish_prompt_pwd_dir_length 0
set -g theme_project_dir_length 1
`
    }

    return `
set -g theme_powerline_fonts no
set -g theme_nerd_fonts no
set -g fish_prompt_pwd_dir_length 0
set -g theme_color_scheme base16-light
`
  }

  getBaseFishConfig() {
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
`
  }

}

export default new Fish()