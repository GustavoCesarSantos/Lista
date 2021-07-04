const tokenHelper = require('../helpers/token')
const UserDao = require('../components/User/UserDao')

module.exports = {
  refresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      const userId = await tokenHelper.verifyOpaqueToken(refreshToken)
      await tokenHelper.invalidateOpaqueToken(refreshToken)
      req.user = await UserDao.getUser(userId)
      return next()
    } catch (err) {
      if (err.name === 'InvalidArgumentError') res.status(401).send(err.message)

      return res.status(err.httpCode).send(err.message)
    }
  }
}
