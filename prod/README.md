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

透過 **--command** 參數來選擇要執行的指令

```bash
ciao-deploy --command={command-name}
```

**可用指令**

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
- web-deploy: 佈署Web專案(Vue、Laravel)

### 基本環境安裝(env)

**參數**

- base: 安裝
- php: 安裝php7.1及相關extension
- phpgearman: 安裝php-gearman
- composer: 安裝composer

### MySQL相關指令

**安裝MySQL(mysql)參數**

- password: 安裝MySQL的Root密碼

**建立MySQL使用者(mysql-user-create)參數**

- rootPassword: MySQL的Root密碼
- username: 使用者帳號
- password: 使用者密碼

**刪除MySQL使用者(mysql-user-delete)參數**

- rootPassword: MySQL的Root密碼
- username: 使用者帳號

**刪除MySQL DB(mysql-db-create)參數**

- rootPassword: MySQL的Root密碼
- db: 資料庫名稱

**建立MySQL DB(mysql-db-delete)參數**

- rootPassword: MySQL的Root密碼
- db: 資料庫名稱

### SSL相關指令

**簽SSL(ssl-sign)參數**

- domain: Web Domain
- path: Web資料夾

**移除SSL(ssl-delete)參數**

- domain: Web Domain

### 工作環境設定(workspace)

**參數**

- base: 安裝基本工具(gnome-disk-utility、apidoc、openvpn)
- chrome: 安裝Google Chrome
- desktop: 設定桌面Soft Link
- dolphin: 設定Dolphin檔案管理 
- media: 安裝多媒體相關工具
- ngrok: 安裝Ngrok
- phpstorm: 安裝PHP Storm
- record: 安裝螢幕錄影工具
- unetbootin: 安裝Unetbootin
- dbeaver: 安裝DBeaver
- all: 全部設定、安裝