const passport = require('passport')

module.exports = {
  bearer: (request, response, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
      if (err && err.name === 'JsonWebTokenError') return response.status(401).send(err.message)

      if (err && err.name === 'TokenExpiredError') return response.status(401).json({ error: err.message, expiradoEm: err.expiredAt })

      if (err) return response.status(500).send(err.message)

      if (!user) return response.status(401).end()

      request.token = info.token
      request.user = user
      return next()
    })(request, response, next)
  }
}
