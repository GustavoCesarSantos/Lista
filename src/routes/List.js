const ListController = require('../components/List/ListController');

module.exports = (app) => {
  app.route('/lists')
    .post(ListController.setList);

  app.route('/lists/:listId')
  .get(ListController.getList)
}