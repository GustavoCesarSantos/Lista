const ListController = require('../components/List/ListController')

module.exports = (app) => {
  app.route('/lists')
    .get(ListController.getLists)

  app.route('/users/:userId/lists')
    .post(ListController.setList)

  app.route('/lists/:listId')
    .get(ListController.getList)
    .put(ListController.updateList)
    .delete(ListController.deleteList)
}
