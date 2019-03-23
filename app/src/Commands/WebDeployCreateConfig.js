import BaseCommand from 'Commands/_BaseCommand'
import { resolve } from 'path'
import { writeFileSync } from 'fs'
class WebDeployCreateConfig extends BaseCommand{
  async setupCommand() {
    this.name = 'web-deploy-config'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = []
    this.description = `產生Web Deploy設定檔`
  }

  async start() {
    const outputPath = resolve(process.env.PWD, 'web-deploy.yml')
    this.getDefaultConfig()
    writeFileSync(outputPath, this.getDefaultConfig(), 'utf-8')

    log(`Web Deploy設定檔建立成功 (${outputPath})`)
  }

  getDefaultConfig() {
    return `
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
            apibase: httsp://api.example.com
            before_build:
                - 'pwd'
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
`
  }
}

export default new WebDeployCreateConfig()