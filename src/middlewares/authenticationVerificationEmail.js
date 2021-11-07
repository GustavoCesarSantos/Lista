const tokenHelper = require('../helpers/token')
const UserDao = require('../components/User/UserDao')

module.exports = {
  verify: async (req, res, next) => {
    try {
      const { token } = req.params
      const userId = await tokenHelper.verifyToken(token)
      const user = await UserDao.getUser(userId)
      user.verifiedEmail = true
      req.user = user
      return next()
    } catch (err) {
      if (err && err.name === 'JsonWebTokenError') return res.status(401).send(err.message)

      if (err && err.name === 'TokenExpiredError') return res.status(401).json({ error: err.message, expiradoEm: err.expiredAt })

      return res.status(500).send(err.message)
    }
  }
}
