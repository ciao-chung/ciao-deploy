import AppKernel from 'AppKernel'
import CubeDeploy from 'Commands/CubeDeploy'
class App extends AppKernel {
  setup() {
    this.commandList = [
      CubeDeploy,
    ]
  }
}

const app = new App()
app.start()