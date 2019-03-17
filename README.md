# Ciao Deploy

> 個人的環境設定、佈署相關工具

![deploy](https://raw.githubusercontent.com/ciao-chung/ciao-deploy/master/meta/demo.gif)

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
- backup-db: 透過git repo備份DB
- apache: 初始化Apache
- domain-sign: 簽Domain
- domain-proxy: 簽Proxy Domain
- domain-delete: 刪除domain
- ssl: 安裝Let's Encrypt certbot
- ssl-sign: 簽SSL
- ssl-delete: 移除SSL
- workspace: 工作環境設定
- phpmyadmin: 安裝phpMyAdmin
- web-deploy: 佈署Web專案(Vue、Laravel)
- web-deploy-config: 產生Web Deploy設定檔
- custom-deploy: 自訂佈署
- setup-deploy-env: 一鍵設定本機端佈署環境
- setup-remote-env: 一鍵設定遠端Web佈署環境

### 基本環境安裝(env)

**參數**

- base(optional): Boolean, 安裝
- php(optional): Boolean, 安裝php7.1及相關extension
- phpgearman(optional): Boolean, 安裝php-gearman
- composer(optional): Boolean, 安裝composer

### MySQL相關指令

**安裝MySQL(mysql)參數**

- password(required): String, 安裝MySQL的Root密碼

**建立MySQL使用者(mysql-user-create)參數**

- rootPassword(required): String, MySQL的Root密碼
- username(required): String, 使用者帳號
- password(required): String, 使用者密碼

**刪除MySQL使用者(mysql-user-delete)參數**

- rootPassword(required): String, MySQL的Root密碼
- username(required): String, 使用者帳號

**刪除MySQL DB(mysql-db-create)參數**

- rootPassword(required): String, MySQL的Root密碼
- db(required): String, 資料庫名稱

**建立MySQL DB(mysql-db-delete)參數**

- rootPassword(required): String, MySQL的Root密碼
- db(required): String, 資料庫名稱

### 透過git repo備份DB(backup-db)

**參數**

- username(required): String, MySQL使用者帳號
- password(required): String, MySQL使用者密碼
- db(required): Array, 要備份的DB名稱, 使用逗號區隔(ex: --db=db_1,db_2,db_3)
- repo(required): String, Git Repository

**範例**

```bash
ciao-deploy --command=backup-db --db=db_1,db_2,db_3 --repo=git@repo.git --username=username --password=password
```

### Domain相關指令

domain-proxy

**簽Domain(domain-sign)參數**

- domain(required): String, Web Domain
- path(required): String, Web資料夾

**簽Proxy Domain(domain-proxy)參數**

- domain(required): String, Web Domain
- port(required): String, 要轉的port

**移除Domain(domain-delete)參數**

- domain(required): String, Web Domain

### SSL相關指令

**簽SSL(ssl-sign)參數**

- domain(required): String, Web Domain
- email(required): String, Certbot要設定憑證過期前通知的email

**移除SSL(ssl-delete)參數**

- domain(required): String, Web Domain

### 安裝phpMyAdmin(phpmyadmin)

**參數**

- password(required): String, 安裝MySQL的Root密碼

### 工作環境設定(workspace)

**參數**

以下參數皆為Boolean格式

- base(optional): Boolean, 安裝基本工具(gnome-disk-utility、apidoc、openvpn)
- chrome(optional): Boolean, 安裝Google Chrome
- desktop(optional): Boolean, 設定桌面Soft Link
- dolphin(optional): Boolean, 設定Dolphin檔案管理 
- media(optional): Boolean, 安裝多媒體相關工具
- ngrok(optional): Boolean, 安裝Ngrok
- phpstorm(optional): Boolean, 安裝PHP Storm
- record(optional): Boolean, 安裝螢幕錄影工具
- unetbootin(optional): Boolean, 安裝Unetbootin
- dbeaver(optional): Boolean, 安裝DBeaver
- all(optional): Boolean, 全部設定、安裝

### 一鍵設定本機端佈署環境(setup-deploy-env)

此指令將自動執行下列指令, 請斟酌情境使用

- fish
- env
- apache

### 一鍵設定遠端Web佈署環境(setup-remote-env)

此指令將自動執行下列指令, 請斟酌情境使用

- fish
- env
- apache
- mysql
- ssl

**參數**

- mysqlRootPassword(required): String, 安裝MySQL的Root密碼

## Web Deploy(web-deploy)設定

### 本機端環境需求

> 可直接透過 ciao-deploy --command=setup-deploy-env 來一鍵設定本機端佈署環境

- Node.js 8.x up
- Yarn
- PHP 7.1 up
- Composer

### command參數

- dump(optional): Boolean, 查看deploy設定檔內容(不會執行佈署)
- first(optional): Boolean, 第一次佈署, 會另外執行下列的初始化動作
  - 如果有佈署後端會執行 **php artisan storage:link** 建立storage link
- config(required): String, 佈署設定檔絕對路徑

### Web佈署設定檔說明

**範例(app/copyfile/config.example.yml)**

```yaml
deploy:
    source:
        branch: master
        repo: repo
    target:
        frontend:
            folder: Frontend
            user: ciao
            host: remote.host
            path: /path/to/frontend
            apibase: https://api.example.com
            build_script: 'yarn build --doc --doc_exclude=BackStage'
        backend:
            folder: Backend
            user: ciao
            host: remote.host
            path: /path/to/frontend
            migrate: true
            env:
                APP_KEY: APP_KEY
                APP_DEBUG: false
                DB_DATABASE: db_name
                DB_USERNAME: mysql_user
                DB_PASSWORD: mysql_password
                CORS: 'https://webcache.googleusercontent.com,http://localhost:8080,https://example.com'
                PHOTO_BASE_URL: http://exmpale.com/storage
```

#### source(程式碼來源)

> required
 
- repo(required): String, git來源
- branch(optional): String, 要佈署的分支, 預設為master

#### target -> frontend(前端)

> optional
 
- folder(optional): String, 前端資料夾名稱, 預設為Frontend
- user(required): String, 主機登入帳號
- host(required): String, 主機位址
- path(required): String, 主機要rsync位置(絕對路徑)
- apibase(required): String, 前端apibase
- build_script(required): String, 因為各種前端打包的方式太多種, 直接在這裡設定

#### target -> backend(後端)

> optional
 
- folder(optional): String, 前端資料夾名稱, 預設為Frontend
- user(required): String, 主機登入帳號
- host(required): String, 主機位址
- path(required): String, 主機要rsync位置(絕對路徑)
- migrate(optional): Boolean, 佈署完成後自動執行migrate, 預設為false
- env(optional): Object, 要設定的Laravel .env參數, 使用此參數的後端專案需安裝imliam/laravel-env-set-command

## 自訂佈署(custom-deploy)設定

### command參數

- dump(optional): Boolean, 查看deploy設定檔內容(不會執行佈署)
- first(optional): Boolean, 定義為第一次佈署, 會另外執行下方設定檔中的**first_execute**指令
- config(required): String, 佈署設定檔絕對路徑

### 自訂佈署設定檔說明

> 情境: 從無到有建立一個SSR服務

**範例(app/copyfile/custom-deploy.example.yml)**

```yaml
deploy:
    init:
        description: '初始化環境'
        remote:
            user: ciao
            host: host.com
            first_execute:
                - 'curl -sL https://raw.githubusercontent.com/ciao-chung/ciao-deploy/master/nodejs.sh | bash'
                - 'sudo yarn global add ciao-deploy'
                - 'ciao-deploy --command=fish'
                - 'ciao-deploy --command=apache'
                - 'ciao-deploy --command=ssl'
    ssr:
        description: '佈署SSR服務'
        execute:
            - 'cp /path/to/ssr.config ./ssr.json'
        remote:
            rsync: true
            user: ciao
            host: host.com
            path: /home/ciao/config
            first_execute:
                - 'sudo yarn global add ciao-ssr'
                - 'ciao-deploy --command=workspace --chrome'
                - 'find /usr/local/share/.config/yarn/global/node_modules/puppeteer/.local-chromium -type d | xargs -L1 -Ixx sudo chmod 755 xx'
                - 'find /usr/local/share/.config/yarn/global/node_modules/puppeteer/.local-chromium -type f -perm /u+x | xargs -L1 -Ixx sudo chmod 755 xx'
                - 'find /usr/local/share/.config/yarn/global/node_modules/puppeteer/.local-chromium -type f -not -perm /u+x | xargs -L1 -Ixx sudo chmod 644 xx'
                - 'ciao-deploy --command=domain-proxy --domain=ssr.foo.com --port=3000'
                - 'ciao-deploy --command=ssl-sign --domain=ssr.foo.com --email=foobar@gmail.com'
                - 'mkdir -p /home/ciao/ssr-cache'
            execute:
                - 'sudo pm2 unstartup'
                - 'sudo pm2 delete ssr'
                - 'sudo pm2 start ciao-ssr --name="ssr" -- --config=/home/ciao/config/ssr.json'
                - 'sudo pm2 startup'
                - 'sudo pm2 save'

```

在deploy屬性下的物件皆為 **自訂佈署物件**

以下為 **自訂佈署物件** 說明

- description(optional): String, 該佈署說明, 單純在Terminal中顯示用
- execute(optional): Array, 本機端的操作, 可作為準備rsync檔案的準備指令或其他操作
- remote(optional): Object, 遠端主機操作物件, 主要設定對遠端主機的操作、rsync
    - user(required): String, 遠端主機登入帳號
    - host(required): String, 遠端主機登入位址
    - rsync(optional): Boolean, 將前面暫存資料夾內的所有檔案做rsync,預設為false
    - path(optional): String, rsync到遠端的路徑
    - first_execute(optional): Array, 首次佈署需要執行的遠端主機指令, 當執行自訂佈署時使用**--first**參數將會執行
    - execute(optional): Array, 佈署需要執行的遠端主機指令, 每次佈署皆會執行