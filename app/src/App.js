import AppKernel from 'AppKernel'
import CubeDeploy from 'Commands/CubeDeploy'
import Env from 'Commands/Env'
class App extends AppKernel {
  setup() {
    this.commandList = [
      CubeDeploy,
      Env,
    ]
  }
}

const app = new App()
app.start()