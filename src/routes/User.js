const authenticationToken = require('../middlewares/authenticationToken')
const authenticationUser = require('../middlewares/authenticationUser')
const CreateUserController = require('../components/User/CreateUser/CreateUserController')
const LoginController = require('../components/User/Login/LoginController')
const LogoutController = require('../components/User/Logout/LogoutController')
const ModifyUserController = require('../components/User/ModifyUser/ModifyUserController')
const RemoveUserController = require('../components/User/RemoveUser/RemoveUserController')
const ReturnUserController = require('../components/User/ReturnUser/ReturnUserController')
const ReturnUsersController = require('../components/User/ReturnUsers/ReturnUsersController')
const UserServiceWithMySqlFactory = require('../components/User/factories/UserServiceWithMySqlFactory')
const VerifyEmailController = require('../components/User/VerifyEmail/VerifyEmailController')

const userServiceWithMySqlFactory = new UserServiceWithMySqlFactory()

const authenticationRefreshToken = userServiceWithMySqlFactory.authenticationRefreshToken()
const authenticationVerificationEmail = userServiceWithMySqlFactory.authenticationVerificationEmail()
const loginController = new LoginController(userServiceWithMySqlFactory.loginService())
const logoutController = new LogoutController(userServiceWithMySqlFactory.logoutService())
const verifyEmailController = new VerifyEmailController(userServiceWithMySqlFactory.verifyEmailService())
const createUserController = new CreateUserController(userServiceWithMySqlFactory.createUserService())
const returnUserController = new ReturnUserController(userServiceWithMySqlFactory.returnUserService())
const returnUsersController = new ReturnUsersController(userServiceWithMySqlFactory.returnUsersService())
const modifyUserController = new ModifyUserController(userServiceWithMySqlFactory.modifyUserService())
const removeUserController = new RemoveUserController(userServiceWithMySqlFactory.removeUserService())

module.exports = (app) => {
  app.route('/login')
    .post(authenticationUser.local, loginController.handler.bind(loginController))

  app.route('/logout')
    .post([authenticationRefreshToken.refresh.bind(authenticationRefreshToken), authenticationToken.bearer], logoutController.handler.bind(logoutController))

  app.route('/users/:userId/tokens/refresh')
    .post(authenticationRefreshToken.refresh.bind(authenticationRefreshToken), loginController.handler.bind(loginController))

  app.route('/users/:token/emails/verify')
    .get(authenticationVerificationEmail.verify.bind(authenticationVerificationEmail), verifyEmailController.handler.bind(verifyEmailController))

  app.route('/users')
    .get(authenticationToken.bearer, returnUsersController.handler.bind(returnUsersController))
    .post(createUserController.handler.bind(createUserController))

  app.route('/users/:userId')
    .get(authenticationToken.bearer, returnUserController.handler.bind(returnUserController))
    .patch(authenticationToken.bearer, modifyUserController.handler.bind(modifyUserController))
    .delete(authenticationToken.bearer, removeUserController.handler.bind(removeUserController))
}
