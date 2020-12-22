const authenticationUser = require('../middlewares/authenticationUser')
const UserController = require('../components/User/UserController')

module.exports = (app) => {
  app.route('/login')
    .post(authenticationUser.local, UserController.login)

  app.route('/users')
    .get(UserController.getUsers)
    .post(UserController.setUser)

  app.route('/users/:userId')
    .get(UserController.getUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser)
}
