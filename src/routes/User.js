const authenticationRefreshToken = require('../middlewares/authenticationRefreshToken')
const authenticationToken = require('../middlewares/authenticationToken')
const authenticationUser = require('../middlewares/authenticationUser')
const authenticationVerificationEmail = require('../middlewares/authenticationVerificationEmail')
const CreateUserController = require('../components/User/CreateUser/CreateUserController')
const LoginController = require('../components/User/Login/LoginController')
const LogoutController = require('../components/User/Logout/LogoutController')
const ModifyUserController = require('../components/User/ModifyUser/ModifyUserController')
const RemoveUserController = require('../components/User/RemoveUser/RemoveUserController')
const ReturnUserController = require('../components/User/ReturnUser/ReturnUserController')
const ReturnUsersController = require('../components/User/ReturnUsers/ReturnUsersController')
const { Users } = require('../database/models')
const UserRepositoryMySql = require('../components/User/Repositories/UserRepositoryMySql')
const VerifyEmailController = require('../components/User/VerifyEmail/VerifyEmailController')

const userRepositoryMySql = new UserRepositoryMySql(Users)
const createUserController = new CreateUserController(userRepositoryMySql)
const loginController = new LoginController(userRepositoryMySql)
const logoutController = new LogoutController(userRepositoryMySql)
const modifyUserController = new ModifyUserController(userRepositoryMySql)
const removeUserController = new RemoveUserController(userRepositoryMySql)
const returnUserController = new ReturnUserController(userRepositoryMySql)
const returnUsersController = new ReturnUsersController(userRepositoryMySql)
const verifyEmailController = new VerifyEmailController(userRepositoryMySql)

module.exports = (app) => {
  app.route('/login')
    .post(authenticationUser.local, loginController.handler.bind(loginController))

  app.route('/logout')
    .post([authenticationRefreshToken.refresh, authenticationToken.bearer], logoutController.handler.bind(logoutController))

  app.route('/users/:userId/tokens/refresh')
    .post(authenticationRefreshToken.refresh, loginController.handler.bind(loginController))

  app.route('/users/:token/emails/verify')
    .get(authenticationVerificationEmail.verify, verifyEmailController.handler.bind(verifyEmailController))

  app.route('/users')
    .get(authenticationToken.bearer, returnUsersController.handler.bind(returnUsersController))
    .post(createUserController.handler.bind(createUserController))

  app.route('/users/:userId')
    .get(authenticationToken.bearer, returnUserController.handler.bind(returnUserController))
    .patch(authenticationToken.bearer, modifyUserController.handler.bind(modifyUserController))
    .delete(authenticationToken.bearer, removeUserController.handler.bind(removeUserController))
}
