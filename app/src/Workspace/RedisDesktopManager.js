class RedisDesktopManager {
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`sudo snap install redis-desktop-manager`)
  }
}

export default new RedisDesktopManager()