const BearerStrategy = require('passport-http-bearer')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const blocklistAccessTokenHelper = require('../helpers/blocklist-access-token')
const UserDao = require('../components/User/UserDao')

async function verifyBlocklistAccessToken (token) {
  const exists = await blocklistAccessTokenHelper.verifyIfExistsToken(token)
  if (exists) throw new jwt.JsonWebTokenError('Token invalido por logout.')
}

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        await verifyBlocklistAccessToken(token)
        const payload = jwt.verify(token, process.env.KEY_JWT)
        const user = await UserDao.getUser(payload.id)
        done(null, user, { token })
      } catch (err) {
        done(err)
      }
    }
  )
)
