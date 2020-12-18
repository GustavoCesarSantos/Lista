const UserController = require('../components/User/UserController')
const passport = require('passport')

module.exports = (app) => {
  app.route('/login')
    .post(passport.authenticate('local', { session: false }), UserController.login)

  app.route('/users')
    .get(UserController.getUsers)
    .post(UserController.setUser)

  app.route('/users/:userId')
    .get(UserController.getUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser)
}
