const { Users } = require('../database/models')

const AuthenticationRefreshToken = require('../middlewares/authenticationRefreshToken')
const authenticationToken = require('../middlewares/authenticationToken')
const authenticationUser = require('../middlewares/authenticationUser')
const AuthenticationVerificationEmail = require('../middlewares/authenticationVerificationEmail')

const UserRepositoryMySql = require('../components/User/Repositories/UserRepositoryMySql')

const LoginService = require('../components/User/Login/LoginService')
const LogoutService = require('../components/User/Logout/LogoutService')
const VerifyEmailService = require('../components/User/VerifyEmail/VerifyEmailService')
const CreateUserService = require('../components/User/CreateUser/CreateUserService')
const ReturnUserService = require('../components/User/ReturnUser/ReturnUserService')
const ReturnUsersService = require('../components/User/ReturnUsers/ReturnUsersService')
const ModifyUserService = require('../components/User/ModifyUser/ModifyUserService')
const RemoveUserService = require('../components/User/RemoveUser/RemoveUserService')

const LoginController = require('../components/User/Login/LoginController')
const LogoutController = require('../components/User/Logout/LogoutController')
const VerifyEmailController = require('../components/User/VerifyEmail/VerifyEmailController')
const CreateUserController = require('../components/User/CreateUser/CreateUserController')
const ReturnUserController = require('../components/User/ReturnUser/ReturnUserController')
const ReturnUsersController = require('../components/User/ReturnUsers/ReturnUsersController')
const ModifyUserController = require('../components/User/ModifyUser/ModifyUserController')
const RemoveUserController = require('../components/User/RemoveUser/RemoveUserController')

const userRepositoryMySql = new UserRepositoryMySql(Users)

const authenticationRefreshToken = new AuthenticationRefreshToken(userRepositoryMySql)
const authenticationVerificationEmail = new AuthenticationVerificationEmail(userRepositoryMySql)

const loginService = new LoginService(userRepositoryMySql)
const logoutService = new LogoutService(userRepositoryMySql)
const verifyEmailService = new VerifyEmailService(userRepositoryMySql)
const createUserService = new CreateUserService(userRepositoryMySql)
const returnUserService = new ReturnUserService(userRepositoryMySql)
const returnUsersService = new ReturnUsersService(userRepositoryMySql)
const modifyUserService = new ModifyUserService(userRepositoryMySql)
const removeUserService = new RemoveUserService(userRepositoryMySql)

const loginController = new LoginController(loginService)
const logoutController = new LogoutController(logoutService)
const verifyEmailController = new VerifyEmailController(verifyEmailService)
const createUserController = new CreateUserController(createUserService)
const returnUserController = new ReturnUserController(returnUserService)
const returnUsersController = new ReturnUsersController(returnUsersService)
const modifyUserController = new ModifyUserController(modifyUserService)
const removeUserController = new RemoveUserController(removeUserService)

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
