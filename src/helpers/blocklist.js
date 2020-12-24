const { createHash } = require('crypto')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const blocklist = require('../config/databases/blocklist')

const existsAsync = promisify(blocklist.exists).bind(blocklist)
const setAsync = promisify(blocklist.set).bind(blocklist)

function generateTokenHash (token) {
  return createHash('sha256').update(token).digest('hex')
}

module.exports = {
  setToken: async token => {
    const { exp } = jwt.decode(token)
    const tokenHash = generateTokenHash(token)
    await setAsync(tokenHash, '')
    blocklist.expireat(tokenHash, exp)
  },

  verifyIfExistsToken: async token => {
    const result = await existsAsync(token)
    return result === 1
  }
}
