const { resolve } = require('path')
const { homedir } = require('os')
const { writeFileSync } = require('fs')
class BaseCommand {
  constructor() {
    this.init()
  }

  init() {
    this.resolve = resolve
    this.homedir = homedir()
    this.writeFileSync = writeFileSync
  }
}

module.exports = BaseCommand