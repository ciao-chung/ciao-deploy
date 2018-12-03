const { resolve } = require('path')
const { homedir } = require('os')
const { existsSync, readFileSync, writeFileSync } = require('fs')
const shelljs = require('shelljs')
class BaseCommand {
  constructor() {
    this.init()
  }

  init() {
    this.shelljs = shelljs
    this.resolve = resolve
    this.homedir = homedir()
    this.existsSync = existsSync
    this.readFileSync = readFileSync
    this.writeFileSync = writeFileSync
  }
}

module.exports = BaseCommand