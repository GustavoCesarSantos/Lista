const redis = require('redis')

const genericAuthenticationListHelper = require('../../helpers/genericAuthenticationList')

const uri = process.env.NODE_ENV === 'production' ? process.env.REDISCLOUD_URL : process.env.DATABASE_URI_CACHE_DEV

const allowlistRefreshToken = redis.createClient({
  url: uri,
  prefix: 'allowlist-refresh-token:'
})

module.exports = genericAuthenticationListHelper(allowlistRefreshToken)
