import BaseCommand from 'Commands/_BaseCommand'
class CreateRootUser extends BaseCommand{
  async setupCommand() {
    this.name = 'create-root-user'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'username',
        description: '使用者名稱',
        required: true,
        type: 'string',
      },
    ]
    this.description = `建立root使用者`
  }

  async start() {
    this.username = this.args.username
    log(`Start create root user: ${this.username}`)
    await execAsync(`sudo adduser --ingroup root --gecos "" --disabled-password --quiet --home /home/${this.username} ${this.username}`)
    await execAsync(`sudo sh -c 'echo "${this.username} ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers'`)
    await execAsync(`sudo mkdir -p /home/${this.username}/.ssh`)
    await execAsync(`sudo touch /home/${this.username}/.ssh/authorized_keys`)
    await execAsync(`sudo chown -R ${this.username} /home/${this.username}/.ssh`)
    log(`Create ${this.username} successfully`)
  }
}

export default new CreateRootUser()