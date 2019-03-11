import AppKernel from 'AppKernel'
import WebDeploy from 'Commands/WebDeploy'
import WebDeployCreateConfig from 'Commands/WebDeployCreateConfig'
import Env from 'Commands/Env'
import Fish from 'Commands/Fish'
import Mysql from 'Commands/Mysql'
import MysqlUserCreate from 'Commands/MysqlUserCreate'
import MysqlUserDelete from 'Commands/MysqlUserDelete'
import MysqlDatabaseCreate from 'Commands/MysqlDatabaseCreate'
import MysqlDatabaseDelete from 'Commands/MysqlDatabaseDelete'
import Apache from 'Commands/Apache'
import DomainSign from 'Commands/DomainSign'
import DomainProxy from 'Commands/DomainProxy'
import DomainDelete from 'Commands/DomainDelete'
import Ssl from 'Commands/Ssl'
import SslSign from 'Commands/SslSign'
import SslDelete from 'Commands/SslDelete'
import Workspace from 'Commands/Workspace'
import PhpMyAdmin from 'Commands/PhpMyAdmin'
import SetupDeployEnv from 'Commands/SetupDeployEnv'
import SetupRemoteEnv from 'Commands/SetupRemoteEnv'
class App extends AppKernel {
  setup() {
    this.commandList = [
      WebDeploy,
      WebDeployCreateConfig,
      Env,
      Fish,
      Mysql,
      MysqlUserCreate,
      MysqlUserDelete,
      MysqlDatabaseCreate,
      MysqlDatabaseDelete,
      Apache,
      DomainSign,
      DomainProxy,
      DomainDelete,
      Ssl,
      SslSign,
      SslDelete,
      Workspace,
      PhpMyAdmin,
      SetupDeployEnv,
      SetupRemoteEnv,
    ]
  }
}

const app = new App()
app.start()