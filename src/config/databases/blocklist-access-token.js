const redis = require('redis')

const genericAuthenticationListHelper = require('../../helpers/genericAuthenticationList')

const blocklistAccessToken = redis.createClient({ prefix: 'blocklist-access-token:' })

module.exports = genericAuthenticationListHelper(blocklistAccessToken)
