const BearerStrategy = require('passport-http-bearer')
const passport = require('passport')

const tokenHelper = require('../helpers/token')
const UserDao = require('../components/User/UserDao')

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        const userId = await tokenHelper.verifyToken(token)
        const user = await UserDao.getUser(userId)
        done(null, user, { token })
      } catch (err) {
        done(err)
      }
    }
  )
)
