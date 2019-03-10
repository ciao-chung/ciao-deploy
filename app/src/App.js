import AppKernel from 'AppKernel'
import CubeDeploy from 'Commands/CubeDeploy'
import Env from 'Commands/Env'
import Fish from 'Commands/Fish'
import Mysql from 'Commands/Mysql'
import MysqlUserCreate from 'Commands/MysqlUserCreate'
class App extends AppKernel {
  setup() {
    this.commandList = [
      CubeDeploy,
      Env,
      Fish,
      Mysql,
      MysqlUserCreate,
    ]
  }
}

const app = new App()
app.start()