import AppKernel from 'AppKernel'
import CubeDeploy from 'Commands/CubeDeploy'
import Env from 'Commands/Env'
import Fish from 'Commands/Fish'
import Mysql from 'Commands/Mysql'
import MysqlUserCreate from 'Commands/MysqlUserCreate'
import MysqlUserDelete from 'Commands/MysqlUserDelete'
import MysqlDatabaseCreate from 'Commands/MysqlDatabaseCreate'
import MysqlDatabaseDelete from 'Commands/MysqlDatabaseDelete'
import Apache from 'Commands/Apache'
import DomainSign from 'Commands/DomainSign'
import DomainDelete from 'Commands/DomainDelete'
import Ssl from 'Commands/Ssl'
import SslSign from 'Commands/SslSign'
import SslDelete from 'Commands/SslDelete'
import Workspace from 'Commands/Workspace'
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
      Apache,
      DomainSign,
      DomainDelete,
      Ssl,
      SslSign,
      SslDelete,
      Workspace,
    ]
  }
}

const app = new App()
app.start()