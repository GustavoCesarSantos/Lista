const authenticationToken = require('../middlewares/authenticationToken')
const ListController = require('../components/List/ListController')

module.exports = (app) => {
  app.route('/lists')
    .get(authenticationToken.bearer, ListController.getLists)

  app.route('/users/:userId/lists')
    .post(authenticationToken.bearer, ListController.setList)

  app.route('/lists/:listId')
    .get(authenticationToken.bearer, ListController.getList)
    .put(authenticationToken.bearer, ListController.updateList)
    .delete(authenticationToken.bearer, ListController.deleteList)
}
