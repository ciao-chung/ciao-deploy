# Ciao Deploy

> A environment configuration and deploy tool which is based on node.js (for all my project)

![deploy](meta/deploy.gif)

## Required

- Node.js 8.x up (can copy and execute **nodejs.sh** directly which in project root)

## Node.js, Yarn, PM2 Quick Installation

```bash
curl -sL https://raw.githubusercontent.com/ciao-chung/ciao-deploy/master/nodejs.sh | bash
```

## Installation

```bash
sudo yarn global add https://github.com/ciao-chung/ciao-deploy.git
```

## Execute

```bash
deploy
```

**With config json**

```bash
deploy --config=/path/to/config.json
```

## Setup SSH Key Permissions

```bash
chmod 400 ~/.ssh/ssh-key
```

## Actions/Sub Actions

With arguments **--action** and **--subAction**, you can use quit mode(without prompt).

Here is all title and value(in brackets) of **actions(first level)** and **sub actions(second level)**.

Third level is more description.

- Setup Environment(setupEnv)
  - Web server(webServer)
    - Execute all command which in environment group.
    - Install MySQL.
    - Install CertBot.
  - Workspace(workSpace)
    - Execute all command which in environment group.
    - Install MySQL.
    - Execute all command which in work space group.
- Deploy Laravel(laravel)
  - Laravel: Init(init)
  - Laravel: Set Env File(setEnvFile)
  - Laravel: Init Database(initDatabase)
  - Laravel: Setup Domain(setupDomain)
  - Laravel: Deploy(deploy)
- Group: Environment(envGroup)
  - Env: Install Base(base)
  - Env: Install Git(git)
  - Env: Test Remote Git Repo(Github/Bitbucket)(testRemoteGitRepo)
  - Env: Install PHP(php)
  - Env: Install Composer(composer)
  - Env: Install PhpMyAdmin(phpMyAdmin)
- Group: Work Space(workspaceGroup)
  - Work Space: Base(base)
  - Work Space: Create Desktop Soft Link(createDesktopSoftLink)
  - Work Space: Install Chrome(chrome)
  - Work Space: Install Dophin(dophin)
  - Work Space: Install Media Software(media)
  - Work Space: Install Ngrok(ngrok)
  - Work Space: Install Phpstrom(phpstorm)
  - Work Space: Install Record Software(record)
  - Work Space: Install Unetbootin(unetbootin)
- Group: Fish
  - Fish Shell: Install(install)
  - Fish Shell: Setup Config(setupConfig)
- Group: Let's Encrypt(letsEncryptGroup)
  - Lets Encrypt: Install CertBot(letsEncrypt)
  - Lets Encrypt: Install Sign SSL(signSSL)
  - Lets Encrypt: Delete SSL(deleteSSL)
- Group: Apache(apacheGroup)
  - Apache: Setup(setup)
  - Apache: Sign Domain(signDomain)
- Group: MySQL(mysqlGroup)
  - MySQL: Install(install)
  - MySQL User: List User(listUser)
  - MySQL User: Create User(createUser)
  - MySQL User: Delete User(deleteUser)
  - MySQL Database: List Database(listDatabase)
  - MySQL Database: Create Database(createDB)
  - MySQL Database: Delete Database(deleteDB)
- Custom Command(command)
- Dump Config JSON File(dumpConfig)
