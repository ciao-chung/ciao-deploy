import BaseCommand from 'Commands/_BaseCommand'
import { resolve } from 'path'
class SetupDeployEnv extends BaseCommand{
  async setupCommand() {
    this.name = 'setup-deploy-env'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = []
    this.description = `一鍵設定本機端佈署環境`
  }

  async start() {
    await execAsync(`ciao-deploy --command=fish --withoutSudo=${withoutSudo}`)
    await execAsync(`ciao-deploy --command=apache --withoutSudo=${withoutSudo}`)
    await execAsync(`ciao-deploy --command=env --base --php --composer --withoutSudo=${withoutSudo}`)
  }
}

export default new SetupDeployEnv()