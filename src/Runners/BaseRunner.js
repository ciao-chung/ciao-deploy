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
          title: 'MySQL: List User',
          instance: require('../Commands/MySQL/ListUser'),
        },
        listDatabase: {
          title: 'MySQL: List Database',
          instance: require('../Commands/MySQL/ListDB'),
        },
        createUser: {
          title: 'MySQL: Create User',
          instance: require('../Commands/MySQL/CreateUser'),
        },
        deleteUser: {
          title: 'MySQL: Delete User',
          instance: require('../Commands/MySQL/DeleteUser'),
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