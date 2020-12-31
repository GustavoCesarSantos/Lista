const authenticationRefreshToken = require('../middlewares/authenticationRefreshToken')
const authenticationToken = require('../middlewares/authenticationToken')
const authenticationUser = require('../middlewares/authenticationUser')
const authenticationVerificationEmail = require('../middlewares/authenticationVerificationEmail')
const UserController = require('../components/User/UserController')

module.exports = (app) => {
  app.route('/login')
    .post(authenticationUser.local, UserController.login)

  app.route('/logout')
    .post([authenticationRefreshToken.refresh, authenticationToken.bearer], UserController.logout)

  app.route('/users/:userId/tokens/refresh')
    .post(authenticationRefreshToken.refresh, UserController.login)

  app.route('/users/:userId/email/verify')
    .get(authenticationVerificationEmail.verify, UserController.verifiedEmail)

  app.route('/users')
    .get(authenticationToken.bearer, UserController.getUsers)
    .post(UserController.setUser)

  app.route('/users/:userId')
    .get(authenticationToken.bearer, UserController.getUser)
    .put(authenticationToken.bearer, UserController.updateUser)
    .delete(authenticationToken.bearer, UserController.deleteUser)
}
