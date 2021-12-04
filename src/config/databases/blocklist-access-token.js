const redis = require('redis')

const genericAuthenticationListHelper = require('../../helpers/genericAuthenticationList')

const url = process.env.REDISCLOUD_URL

const blocklistAccessToken = redis.createClient({
  url: url,
  prefix: 'blocklist-access-token:'
})

module.exports = genericAuthenticationListHelper(blocklistAccessToken)
