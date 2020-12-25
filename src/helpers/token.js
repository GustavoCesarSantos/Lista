const addDays = require('date-fns/addDays')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const allowlistRefreshToken = require('../config/databases/allowlist-refresh-token')

module.exports = {
  createToken (user) {
    const payload = {
      id: user.id
    }

    const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: '15m' })
    return token
  },

  async createOpaqueToken (user) {
    const opaqueToken = crypto.randomBytes(24).toString('hex')
    const expireAt = parseInt((addDays(new Date(), 5).getTime() / 1000).toFixed(0))
    await allowlistRefreshToken.setToken(opaqueToken, user.id, expireAt)
    return opaqueToken
  }
}
