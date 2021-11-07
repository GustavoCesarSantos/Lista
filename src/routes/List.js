const authenticationToken = require('../middlewares/authenticationToken')
const CreateListController = require('../components/List/CreateList/CreateListController')
const { Lists } = require('../database/models')
const ListRepositoryMySql = require('../components/List/repositories/ListRepositoryMySql')
const ModifyListController = require('../components/List/ModifyList/ModifyListController')
const RemoveListController = require('../components/List/RemoveList/RemoveListController')
const ReturnListController = require('../components/List/ReturnList/ReturnListController')
const ReturnListsController = require('../components/List/ReturnLists/ReturnListsController')

const listRepositoryMySql = new ListRepositoryMySql(Lists)
const createListController = new CreateListController(listRepositoryMySql)
const listListController = new ReturnListController(listRepositoryMySql)
const listListsController = new ReturnListsController(listRepositoryMySql)
const modifyListController = new ModifyListController(listRepositoryMySql)
const removeListController = new RemoveListController(listRepositoryMySql)

module.exports = (app) => {
  app.route('/lists')
    .get(authenticationToken.bearer, listListsController.handler.bind(listListsController))

  app.route('/users/:userId/lists')
    .post(authenticationToken.bearer, createListController.handler.bind(createListController))

  app.route('/lists/:listId')
    .get(authenticationToken.bearer, listListController.handler.bind(listListController))
    .patch(authenticationToken.bearer, modifyListController.handler.bind(modifyListController))
    .delete(authenticationToken.bearer, removeListController.handler.bind(removeListController))
}
