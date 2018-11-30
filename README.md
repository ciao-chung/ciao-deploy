# Ciao Deploy

> A environment configuration and deploy tool which is based on node.js

![deploy](meta/deploy.gif)

## Required

- Node.js 8.x up

## Actions
- Setup environment
  - Web server(Command > Base environment)
  - Workspace

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


## Command

### Install Fish Shell
- Install fish shell

### Setup Fish Shell
- Setup base fish config

### MySQL create user

- Create mysql user

### MySQL delete user

- Delete mysql user

### Base environment

**Git**
- Install git
- Install tig

**PHP**
- Install php7.1
- Install php7.1-mysql
- Install php7.1-mbstring
- Install php7.1-mcrypt
- Install php7.1-gd
- Install php7.1-zip
- Install php7.1-dom
- Install libapache2-mod-php7.1

**Composer**
- Install composer
- Setup composer as global command

**MySQL**
- Install MySQL
- Setup default user/password

**PhpMyAdmin**
- Install phpmyadmin
- Setup username/password
- Enable rewrite module

### Web server environment

- Install certbot