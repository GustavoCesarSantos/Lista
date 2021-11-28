const redis = require('redis')

const genericAuthenticationListHelper = require('../../helpers/genericAuthenticationList')

const uri = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URI_CACHE_PROD : process.env.DATABASE_URI_CACHE_DEV

const blocklistAccessToken = redis.createClient({
  url: uri,
  prefix: 'blocklist-access-token:'
})

module.exports = genericAuthenticationListHelper(blocklistAccessToken)
