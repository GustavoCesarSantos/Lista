const passport = require('passport')

module.exports = {
  local: (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err && err.name === 'InvalidArgumentError') {
        return res.status(401).send(err.message)
      }

      if (err) {
        return res.status(500).send(err.message)
      }

      if (!user) {
        return res.status(401).end()
      }
      req.user = user
      return next()
    })(req, res, next)
  }
}
