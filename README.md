# Ciao Deploy

> A environment configuration and deploy tool which is based on node.js (for all my project)

![deploy](meta/deploy.gif)

## Required

- Node.js 8.x up (can copy and execute **nodejs.sh** directly which in project root)

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