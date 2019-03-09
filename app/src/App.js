import AppKernel from 'AppKernel'
import CubeDeploy from 'Commands/CubeDeploy'
import Env from 'Commands/Env'
import Fish from 'Commands/Fish'
class App extends AppKernel {
  setup() {
    this.commandList = [
      CubeDeploy,
      Env,
      Fish,
    ]
  }
}

const app = new App()
app.start()