const authenticationToken = require('../middlewares/authenticationToken');
const CreateListController = require('../components/List/CreateList/CreateListController');
const ListServiceWithMySqlFactory = require('../components/List/factories/ListServiceWithMySqlFactory');
const ModifyListController = require('../components/List/ModifyList/ModifyListController');
const RemoveListController = require('../components/List/RemoveList/RemoveListController');
const ReturnListController = require('../components/List/ReturnList/ReturnListController');
const ReturnListsController = require('../components/List/ReturnLists/ReturnListsController');

const listServiceWithMySqlFactory = new ListServiceWithMySqlFactory();

const createListController = new CreateListController(
    listServiceWithMySqlFactory.createListService(),
);
const listListController = new ReturnListController(
    listServiceWithMySqlFactory.listListService(),
);
const listListsController = new ReturnListsController(
    listServiceWithMySqlFactory.listListsService(),
);
const modifyListController = new ModifyListController(
    listServiceWithMySqlFactory.modifyListService(),
);
const removeListController = new RemoveListController(
    listServiceWithMySqlFactory.removeListService(),
);

module.exports = app => {
    app.route('/lists').get(
        authenticationToken.bearer,
        listListsController.handler.bind(listListsController),
    );

    app.route('/users/:userId/lists').post(
        authenticationToken.bearer,
        createListController.handler.bind(createListController),
    );

    app.route('/lists/:listId')
        .get(
            authenticationToken.bearer,
            listListController.handler.bind(listListController),
        )
        .patch(
            authenticationToken.bearer,
            modifyListController.handler.bind(modifyListController),
        )
        .delete(
            authenticationToken.bearer,
            removeListController.handler.bind(removeListController),
        );
};
