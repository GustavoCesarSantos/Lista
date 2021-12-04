const redis = require('redis')

const genericAuthenticationListHelper = require('../../helpers/genericAuthenticationList')

const url = process.env.NODE_ENV === 'production' ? process.env.REDISCLOUD_URL : process.env.DEV_CACHE_URL

const allowlistRefreshToken = redis.createClient({
  url: url,
  prefix: 'allowlist-refresh-token:'
})

module.exports = genericAuthenticationListHelper(allowlistRefreshToken)
