import AppKernel from 'AppKernel'
import WebDeploy from 'Commands/WebDeploy'
import WebDeployCreateConfig from 'Commands/WebDeployCreateConfig'
import Env from 'Commands/Env'
import Fish from 'Commands/Fish'
import Redis from 'Commands/Redis'
import RedisSetPassword from 'Commands/RedisSetPassword'
import Mysql from 'Commands/Mysql'
import MysqlCloneTables from 'Commands/MysqlCloneTables'
import MysqlUserCreate from 'Commands/MysqlUserCreate'
import MysqlUserDelete from 'Commands/MysqlUserDelete'
import MysqlDatabaseCreate from 'Commands/MysqlDatabaseCreate'
import MysqlDatabaseDelete from 'Commands/MysqlDatabaseDelete'
import Apache from 'Commands/Apache'
import Nginx from 'Commands/Nginx'
import NginxDomainSign from 'Commands/NginxDomainSign'
import NginxDomainDelete from 'Commands/NginxDomainDelete'
import DomainSign from 'Commands/DomainSign'
import DomainProxy from 'Commands/DomainProxy'
import DomainSocketProxy from 'Commands/DomainSocketProxy'
import DomainDelete from 'Commands/DomainDelete'
import Ssl from 'Commands/Ssl'
import SslSign from 'Commands/SslSign'
import SslDelete from 'Commands/SslDelete'
import Workspace from 'Commands/Workspace'
import PhpMyAdmin from 'Commands/PhpMyAdmin'
import SetupDeployEnv from 'Commands/SetupDeployEnv'
import SetupRemoteEnv from 'Commands/SetupRemoteEnv'
import BackupDB from 'Commands/BackupDB'
import CustomDeploy from 'Commands/CustomDeploy'
import PhpSetupUploadMaxSize from 'Commands/PhpSetupUploadMaxSize'
import Version from 'Commands/Version'
class App extends AppKernel {
  setup() {
    this.commandList = [
      WebDeploy,
      WebDeployCreateConfig,
      Env,
      Fish,
      Redis,
      RedisSetPassword,
      Mysql,
      MysqlCloneTables,
      MysqlUserCreate,
      MysqlUserDelete,
      MysqlDatabaseCreate,
      MysqlDatabaseDelete,
      Apache,
      Nginx,
      NginxDomainSign,
      NginxDomainDelete,
      DomainSign,
      DomainProxy,
      DomainSocketProxy,
      DomainDelete,
      Ssl,
      SslSign,
      SslDelete,
      Workspace,
      PhpMyAdmin,
      SetupDeployEnv,
      SetupRemoteEnv,
      BackupDB,
      CustomDeploy,
      PhpSetupUploadMaxSize,
      Version,
    ]
  }
}

const app = new App()
app.start()