import BaseCommand from 'Commands/_BaseCommand'
class Vsftpd extends BaseCommand{
  async setupCommand() {
    this.name = 'vsftpd'
    this.configFile = {
      required: false,
      property: 'config',
    }

    this.argsConfig = [
      {
        name: 'username',
        description: '帳號',
        required: false,
        type: 'string',
      },
      {
        name: 'password',
        description: '密碼',
        required: false,
        type: 'string',
      },
      {
        name: 'homedir',
        description: 'FTP帳號登入根目錄(結尾請勿使用/)',
        required: false,
        type: 'string',
      },
    ]
    this.description = `安裝vsftpd`
  }

  async start() {
    await this.installVsftpd()
    if(this.args.username) {
      try {
        await this.setupUser(this.args.username, this.args.password, this.args.homedir)
      } catch (error) {
        log(error, 'yellow')
      }
    }

    try {
      await execAsync(`sudo service vsftpd restart`)
    } catch (error) {
      log(error, 'yellow')
    }
    try {
      await execAsync(`sudo service vsftpd status`)
    } catch (error) {
      log(error, 'yellow')
    }

    try {
      await execAsync(`sudo systemctl restart vsftpd`)
    } catch (error) {
      log(error, 'yellow')
    }
  }

  async installVsftpd() {
    await execAsync(`sudo apt-get update -y`)
    await execAsync(`sudo apt-get install vsftpd -y`)
    await execAsync(`sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.bak`)
    await execAsync(`sudo sed -i 's,^#write_enable=.*$,write_enable=YES,' /etc/vsftpd.conf`)
    await execAsync(`sudo sed -i 's,^#local_umask=.*$,local_umask=022,' /etc/vsftpd.conf`)
    await execAsync(`sudo sed -i 's,^#chroot_local_user=.*$,chroot_local_user=YES,' /etc/vsftpd.conf`)
    await execAsync(`sudo echo "allow_writeable_chroot=YES" >> /etc/vsftpd.conf`)
    await execAsync(`sudo echo "pasv_min_port=40000" >> /etc/vsftpd.conf`)
    await execAsync(`sudo echo "pasv_max_port=40100" >> /etc/vsftpd.conf`)

    // user list設定
    await execAsync(`sudo mkdir -p /etc/vsftpd`)
    await execAsync(`sudo touch /etc/vsftpd/user_list`)
    await execAsync(`sudo mkdir -p /etc/vsftpd/user.conf`)
    await execAsync(`sudo echo "userlist_enable=YES" >> /etc/vsftpd.conf`)
    await execAsync(`sudo echo "userlist_file=/etc/vsftpd/user_list" >> /etc/vsftpd.conf`)
    await execAsync(`sudo echo "userlist_deny=NO" >> /etc/vsftpd.conf`)
    await execAsync(`sudo echo "user_config_dir=/etc/vsftpd/user.conf" >> /etc/vsftpd.conf`)
  }

  async setupUser(username, password = null, homedir = null) {
    // 設定帳號
    await execAsync(`sudo useradd -m ${username} -s /usr/sbin/nologin`)
    await execAsync(`sudo echo "${username}" >> /etc/vsftpd/user_list`)
    await execAsync(`sudo echo "local_root=${homedir}/" > /etc/vsftpd/user.conf/${username}`)
    if(password) {
      await execAsync(`sudo echo '${username}:${password}' | chpasswd`)
    }

    if(!password) {
      log(`請自行執行以下指令設定帳號${username}的密碼`, 'yellow')
      log(`echo '${username}:{password}' | chpasswd`)
    }

    // 設定home目錄
    if(!homedir) {
      homedir = `/home/${username}/ftp`
    }
    await execAsync(`sudo mkdir -p ${homedir}`)
    await execAsync(`sudo echo "Hi ${username}" > ${homedir}/hello-${username}.txt`)
    await execAsync(`sudo chown -R ${username}:${username} ${homedir}`)
    await execAsync(`echo "/usr/sbin/nologin" | sudo tee -a /etc/shells`)
  }
}

export default new Vsftpd()