const authenticationToken = require('../middlewares/authenticationToken');
const CreateListController = require('../components/List/CreateList/CreateListController');
const ListServiceWithMySqlFactory = require('../components/List/factories/ListServiceWithMySqlFactory');
const ModifyListController = require('../components/List/ModifyList/ModifyListController');
const RemoveListController = require('../components/List/RemoveList/RemoveListController');
const ReturnListController = require('../components/List/ReturnList/ReturnListController');
const ReturnListsController = require('../components/List/ReturnLists/ReturnListsController');

const createListController = new CreateListController(
	ListServiceWithMySqlFactory.createListService(),
);
const returnListController = new ReturnListController(
	ListServiceWithMySqlFactory.returnListService(),
);
const returnListsController = new ReturnListsController(
	ListServiceWithMySqlFactory.returnListsService(),
);
const modifyListController = new ModifyListController(
	ListServiceWithMySqlFactory.modifyListService(),
);
const removeListController = new RemoveListController(
	ListServiceWithMySqlFactory.removeListService(),
);

module.exports = app => {
	app.route('/lists').get(
		authenticationToken.bearer,
		returnListsController.handler.bind(returnListsController),
	);

	app.route('/users/:userId/lists').post(
		authenticationToken.bearer,
		createListController.handler.bind(createListController),
	);

	app.route('/lists/:listId')
		.get(
			authenticationToken.bearer,
			returnListController.handler.bind(returnListController),
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
