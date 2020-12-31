const UserDao = require('../components/User/UserDao')

module.exports = {
  verify: async (req, res, next) => {
    try {
      const { userId } = req.params
      const user = await UserDao.getUser(userId)
      user.verifiedEmail = true
      req.user = user
      return next()
    } catch (err) {
      return res.status(500).send(err.message)
    }
  }
}
