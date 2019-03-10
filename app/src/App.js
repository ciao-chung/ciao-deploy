import AppKernel from 'AppKernel'
import CubeDeploy from 'Commands/CubeDeploy'
import Env from 'Commands/Env'
import Fish from 'Commands/Fish'
import Mysql from 'Commands/Mysql'
import MysqlUserCreate from 'Commands/MysqlUserCreate'
import MysqlUserDelete from 'Commands/MysqlUserDelete'
import MysqlDatabaseCreate from 'Commands/MysqlDatabaseCreate'
import MysqlDatabaseDelete from 'Commands/MysqlDatabaseDelete'
class App extends AppKernel {
  setup() {
    this.commandList = [
      CubeDeploy,
      Env,
      Fish,
      Mysql,
      MysqlUserCreate,
      MysqlUserDelete,
      MysqlDatabaseCreate,
      MysqlDatabaseDelete,
    ]
  }
}

const app = new App()
app.start()