const BaseCommand = require('../BaseCommand')
const SignDomainService = require('../../Services/SignDomains')
class SignDomain extends BaseCommand{
  async exec() {
    let domains
    try {
      domains = config.signDomains
    } catch(error) {
      log(`Sign domain fail: ${error}`, 'red')
      return
    }

    if(typeof domains != 'object') {
      log(`Sign domain fail: domains property in config must be array type`, 'red')
      return
    }

    for(const domainConfig of domains) {
      await SignDomainService.sign(domainConfig.domain, domainConfig.path)
    }
  }
}

module.exports = new SignDomain()