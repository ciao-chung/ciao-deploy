class Ngrok {
  async exec() {
    await execAsync(`sudo apt-get update`)
    await execAsync(`wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip`)
    await execAsync(`unzip ngrok-stable-linux-amd64.zip`)
    await execAsync(`sudo mv ngrok /usr/bin`)
    await execAsync(`ngrok`)
  }
}

export default new Ngrok()