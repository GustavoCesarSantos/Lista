const redis = require('redis')

const genericAuthenticationListHelper = require('../../helpers/genericAuthenticationList')

const allowlistRefreshToken = redis.createClient({ prefix: 'allowlist-refresh-token:' })

module.exports = genericAuthenticationListHelper(allowlistRefreshToken)
