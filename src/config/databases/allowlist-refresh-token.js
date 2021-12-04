const redis = require('redis')

const genericAuthenticationListHelper = require('../../helpers/genericAuthenticationList')

const url = process.env.REDISCLOUD_URL

const allowlistRefreshToken = redis.createClient({
  url: url,
  prefix: 'allowlist-refresh-token:'
})

module.exports = genericAuthenticationListHelper(allowlistRefreshToken)
