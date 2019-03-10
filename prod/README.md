# Ciao Deploy

> 個人的環境設定、佈署相關工具

![deploy](meta/demo.gif)

## 環境需求

- Node.js 8.x up (可以直接執行專案根目錄的nodejs.sh來安裝)

```bash
curl -sL https://raw.githubusercontent.com/ciao-chung/ciao-deploy/master/nodejs.sh | bash
```

## 安裝

```bash
sudo yarn global add ciao-deploy
```

## 指令

可執行**ciao-deploy -h**查看所有可用指令

透過**--command**參數來選擇要執行的指令

```bash
ciao-deploy --command={command-name}
```

**可用指令**

- cube-deploy: Cube專案佈署工具
- env: 基本環境安裝
- fish: 安裝Fish Shell
- mysql: 安裝MySQL
- mysql-user-create: 建立MySQL使用者
- mysql-user-delete: 刪除MySQL使用者
- mysql-db-create: 建立MySQL DB
- mysql-db-delete: 刪除MySQL DB
- apache: 初始化Apache
- domain-sign:
- domain-delete:
- ssl: 安裝Let's Encrypt certbot
- ssl-sign: 簽SSL
- ssl-delete: 移除SSL
- workspace: 工作環境設定