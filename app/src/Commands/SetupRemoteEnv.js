import BaseCommand from 'Commands/_BaseCommand'
import { resolve } from 'path'
class SetupRemoteEnv extends BaseCommand{
  async setupCommand() {
    this.name = 'setup-remote-env'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'mysqlRootPassword',
        description: 'MySQL root密碼',
        required: true,
        type: 'string',
      },
    ]
    this.description = `一鍵設定遠端Web佈署環境`
  }

  async start() {
    await execAsync(`ciao-deploy --command=fish --withoutSudo=${withoutSudo}`)
    await execAsync(`ciao-deploy --command=env --base --php --composer --withoutSudo=${withoutSudo}`)
    await execAsync(`ciao-deploy --command=apache --withoutSudo=${withoutSudo}`)
    await execAsync(`ciao-deploy --command=mysql --password=${this.args.mysqlRootPassword} --withoutSudo=${withoutSudo}`)
    await execAsync(`ciao-deploy --command=ssl --withoutSudo=${withoutSudo}`)
  }
}

export default new SetupRemoteEnv()