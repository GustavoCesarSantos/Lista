const ListController = require('../components/List/ListController')
const passport = require('passport')

module.exports = (app) => {
  app.route('/lists')
    .get(passport.authenticate('bearer', { session: false }), ListController.getLists)

  app.route('/users/:userId/lists')
    .post(passport.authenticate('bearer', { session: false }), ListController.setList)

  app.route('/lists/:listId')
    .get(passport.authenticate('bearer', { session: false }), ListController.getList)
    .put(passport.authenticate('bearer', { session: false }), ListController.updateList)
    .delete(passport.authenticate('bearer', { session: false }), ListController.deleteList)
}
