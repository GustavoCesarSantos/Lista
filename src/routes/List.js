const ListController = require('../components/List/ListController');

module.exports = (app) => {
  app.route('/lists')
    .get(ListController.getLists)
    .post(ListController.setList);

  app.route('/lists/:listId')
  .get(ListController.getList)
  .put(ListController.updateList)
  .delete(ListController.deleteList);
}