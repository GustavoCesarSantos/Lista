const allowlistRefreshTokenConfig = require('../config/databases/allowlist-refresh-token')
const UsersModel = require('../database/models/Users')

async function verifyRefreshToken (refreshToken) {
  if (!refreshToken) throw new Error('Refresh token não enviado.')

  const payload = await allowlistRefreshTokenConfig.returnPayload(refreshToken)

  if (!payload) throw new Error('Refresh token inválido.')

  return payload
}

async function invalidateRefreshToken (refreshToken) {
  await allowlistRefreshTokenConfig.deleteToken(refreshToken)
}

module.exports = {
  refresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      const userId = await verifyRefreshToken(refreshToken)
      await invalidateRefreshToken(refreshToken)
      req.user = await UsersModel.findByPk(userId)
      return next()
    } catch (err) {
      if (err.name === 'InvalidArgumentError') res.status(401).send(err.message)

      return res.status(500).send(err.message)
    }
  }
}
