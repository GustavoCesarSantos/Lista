const redis = require('redis')

const genericAuthenticationListHelper = require('../../helpers/genericAuthenticationList')

const url = process.env.NODE_ENV === 'production' ? process.env.REDISCLOUD_URL : process.env.DEV_CACHE_URL

const blocklistAccessToken = redis.createClient({
  url: url,
  prefix: 'blocklist-access-token:'
})

module.exports = genericAuthenticationListHelper(blocklistAccessToken)
