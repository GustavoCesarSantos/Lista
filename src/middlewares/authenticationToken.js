const passport = require('passport')

module.exports = {
  bearer: (req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
      if (err && err.name === 'JsonWebTokenError') return res.status(401).send(err.message)

      if (err && err.name === 'TokenExpiredError') return res.status(401).json({ error: err.message, expiradoEm: err.expiredAt })

      if (err) return res.status(500).send(err.message)

      if (!user) return res.status(401).end()

      req.token = info.token
      req.user = user
      return next()
    })(req, res, next)
  }
}
