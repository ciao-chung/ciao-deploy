const { argv } = require('yargs')
class BaseRunner {
  constructor() {
    this.init()
  }

  async init() {
    this.args = argv
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
        testRemoteGitRepo: {
          title: 'Env: Test Remote Git Repo(Github/Bitbucket)',
          instance: require('../Commands/Env/TestRemoteGitRepo'),
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
      workspace: {
        base: {
          title: 'Work Space: Base',
          instance: require('../Commands/WorkSpace/Base'),
        },
        createDesktopSoftLink: {
          title: 'Work Space: Create Desktop Soft Link',
          instance: require('../Commands/WorkSpace/CreateDesktopSoftLink'),
        },
        chrome: {
          title: 'Work Space: Install Chrome',
          instance: require('../Commands/WorkSpace/Chrome'),
        },
        dophin: {
          title: 'Work Space: Install Dophin',
          instance: require('../Commands/WorkSpace/Dophin'),
        },
        media: {
          title: 'Work Space: Install Media Software',
          instance: require('../Commands/WorkSpace/Media'),
        },
        ngrok: {
          title: 'Work Space: Install Ngrok',
          instance: require('../Commands/WorkSpace/Ngrok'),
        },
        phpstrom: {
          title: 'Work Space: Install Phpstrom',
          instance: require('../Commands/WorkSpace/Phpstrom'),
        },
        record: {
          title: 'Work Space: Install Record Software',
          instance: require('../Commands/WorkSpace/Record'),
        },
        unetbootin: {
          title: 'Work Space: Install Unetbootin',
          instance: require('../Commands/WorkSpace/Unetbootin'),
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
        setup: {
          title: 'Apache: Setup',
          instance: require('../Commands/Apache/Setup'),
        },
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
        deleteSSL: {
          title: 'Let\s Encrypt: Delete SSL',
          instance: require('../Commands/LetsEncrypt/DeleteSSL'),
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
        setupDomain: {
          title: 'Laravel: Setup Domain',
          instance: require('../Commands/Laravel/SetupDomain'),
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