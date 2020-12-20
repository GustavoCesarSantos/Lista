const passport = require('passport')
const BearerStrategy = require('passport-http-bearer')
const jwt = require('jsonwebtoken')

const UserDao = require('../components/User/UserDao')

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        const payload = jwt.verify(token, process.env.KEY_JWT)
        const user = await UserDao.getUser(payload.id)
        done(null, user)
      } catch (err) {
        done(err)
      }
    }
  )
)
