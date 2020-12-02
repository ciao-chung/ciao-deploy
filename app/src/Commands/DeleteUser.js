import BaseCommand from 'Commands/_BaseCommand'
class DeleteUser extends BaseCommand{
  async setupCommand() {
    this.name = 'remove-user'
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
    this.description = `刪除使用者`
  }

  async start() {
    this.username = this.args.username
    log(`Start delete root user: ${this.username}`)
    await execAsync(`sudo deluser --remove-home ${this.username}`)
    log(`Delete ${this.username} successfully`)
  }
}

export default new DeleteUser()