const BearerStrategy = require('passport-http-bearer')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const blocklistHelper = require('../helpers/blocklist')
const UserDao = require('../components/User/UserDao')

async function verifyBlocklist (token) {
  const exists = await blocklistHelper.verifyIfExistsToken(token)
  if (exists) throw new jwt.JsonWebTokenError('Token invalido por logout.')
}

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        await verifyBlocklist(token)
        const payload = jwt.verify(token, process.env.KEY_JWT)
        const user = await UserDao.getUser(payload.id)
        done(null, user, { token })
      } catch (err) {
        done(err)
      }
    }
  )
)
