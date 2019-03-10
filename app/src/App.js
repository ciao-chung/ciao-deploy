import AppKernel from 'AppKernel'
import CubeDeploy from 'Commands/CubeDeploy'
import Env from 'Commands/Env'
import Fish from 'Commands/Fish'
import Mysql from 'Commands/Mysql'
class App extends AppKernel {
  setup() {
    this.commandList = [
      CubeDeploy,
      Env,
      Fish,
      Mysql,
    ]
  }
}

const app = new App()
app.start()