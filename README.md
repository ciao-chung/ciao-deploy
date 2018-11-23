# Ciao Deploy

> A environment configuration and deploy tool which is based on node.js

## Required

- Node.js 8.x up

## Actions
- Setup environment
  - Web server
  - Workspace
  
## Web Server Install Task (Setup environment)

- Fish
  - Install fish shell
  - Install omf
  - Setup base fish config
- Git
  - Install git
  - Install tig
- Php
  - Install php7
- Composer
  - Install composer
  - Setup composer as global command
- MySQL
  - Install MySQL
  - Setup default user/password
- PhpMyAdmin
  - Install phpmyadmin
  - Setup username/password
  - Enable rewrite module

## Installation

```bash
sudo yarn global add https://github.com/ciao-chung/ciao-deploy.git
```

## Execute

```bash
sudo deploy
```
