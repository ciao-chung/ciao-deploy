class BaseRunner {
  constructor() {
    this.init()
  }

  async init() {
    this.commands = {
      env: {
        base: {
          title: 'Env: Install Base',
          instance: require('../Commands/Env/Base'),
        },
        git: {
          title: 'Env: Install Git',
          instance: require('../Commands/Env/Git'),
        },
        php: {
          title: 'Env: Install PHP',
          instance: require('../Commands/Env/Php'),
        },
        composer: {
          title: 'Env: Install Composer',
          instance: require('../Commands/Env/Composer'),
        },
        phpMyAdmin: {
          title: 'Env: Install PhpMyAdmin',
          instance: require('../Commands/Env/PhpMyAdmin'),
        },
      },
      fish: {
        install: {
          title: 'Fish Shell: Install',
          instance: require('../Commands/Fish/Install'),
        },
        setupConfig: {
          title: 'Fish Shell: Setup Config',
          instance: require('../Commands/Fish/SetupConfig'),
        },
      },
      mysql: {
        install: {
          title: 'MySQL: Install',
          instance: require('../Commands/MySQL/Install'),
        },
        listUser: {
          title: 'MySQL User: List User',
          instance: require('../Commands/MySQL/ListUser'),
        },
        createUser: {
          title: 'MySQL User: Create User',
          instance: require('../Commands/MySQL/CreateUser'),
        },
        deleteUser: {
          title: 'MySQL User: Delete User',
          instance: require('../Commands/MySQL/DeleteUser'),
        },
        listDatabase: {
          title: 'MySQL: List Database',
          instance: require('../Commands/MySQL/ListDB'),
        },
        createDB: {
          title: 'MySQL Database: Create Database',
          instance: require('../Commands/MySQL/CreateDB'),
        },
        deleteDB: {
          title: 'MySQL Database: Delete Database',
          instance: require('../Commands/MySQL/DeleteDB'),
        },
      },
      apache: {
        signDomain: {
          title: 'Apache: Sign Domain',
          instance: require('../Commands/Apache/SignDomain'),
        },
      },
      letsEncrypt: {
        install: {
          title: 'Let\s Encrypt: Install CertBot',
          instance: require('../Commands/LetsEncrypt/Install'),
        },
        signSSL: {
          title: 'Let\s Encrypt: Install Sign SSL',
          instance: require('../Commands/LetsEncrypt/SignSSL'),
        },
      },
      laravel: {
        init: {
          title: 'Laravel: Init',
          instance: require('../Commands/Laravel/Init'),
        },
        setEnvFile: {
          title: 'Laravel: Set Env File',
          instance: require('../Commands/Laravel/SetEnvFile'),
        },
        initDatabase: {
          title: 'Laravel: Set Env File',
          instance: require('../Commands/Laravel/InitDatabase'),
        },
        deploy: {
          title: 'Laravel: Deploy',
          instance: require('../Commands/Laravel/Deploy'),
        },
      },
    }
  }

  async start() {
    // TODO
  }
}

module.exports = BaseRunner