const { Lists } = require('../database/models')

const authenticationToken = require('../middlewares/authenticationToken')

const ListRepositoryMySql = require('../components/List/repositories/ListRepositoryMySql')

const CreateListController = require('../components/List/CreateList/CreateListController')
const ModifyListController = require('../components/List/ModifyList/ModifyListController')
const RemoveListController = require('../components/List/RemoveList/RemoveListController')
const ReturnListController = require('../components/List/ReturnList/ReturnListController')
const ReturnListsController = require('../components/List/ReturnLists/ReturnListsController')

const CreateListService = require('../components/List/CreateList/CreateListService')
const ModifyListService = require('../components/List/ModifyList/ModifyListService')
const RemoveListService = require('../components/List/RemoveList/RemoveListService')
const ReturnListService = require('../components/List/ReturnList/ReturnListService')
const ReturnListsService = require('../components/List/ReturnLists/ReturnListsService')

const listRepositoryMySql = new ListRepositoryMySql(Lists)

const createListService = new CreateListService(listRepositoryMySql)
const listListService = new ReturnListService(listRepositoryMySql)
const listListsService = new ReturnListsService(listRepositoryMySql)
const modifyListService = new ModifyListService(listRepositoryMySql)
const removeListService = new RemoveListService(listRepositoryMySql)

const createListController = new CreateListController(createListService)
const listListController = new ReturnListController(listListService)
const listListsController = new ReturnListsController(listListsService)
const modifyListController = new ModifyListController(modifyListService)
const removeListController = new RemoveListController(removeListService)

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
