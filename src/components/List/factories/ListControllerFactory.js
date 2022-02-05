const ListServiceWithMySqlFactory = require('./ListServiceWithMySqlFactory');
const CreateListController = require('../CreateList/CreateListController');
const ModifyListController = require('../ModifyList/ModifyListController');
const RemoveListController = require('../RemoveList/RemoveListController');
const ReturnListController = require('../ReturnList/ReturnListController');
const ReturnListsController = require('../ReturnLists/ReturnListsController');

class ListControllerFactory {
	static makeCreateListController() {
		return new CreateListController(
			ListServiceWithMySqlFactory.createListService(),
		);
	}

	static makeReturnListController() {
		return new ReturnListController(
			ListServiceWithMySqlFactory.returnListService(),
		);
	}

	static makeReturnListsController() {
		return new ReturnListsController(
			ListServiceWithMySqlFactory.returnListsService(),
		);
	}

	static makeModifyListController() {
		return new ModifyListController(
			ListServiceWithMySqlFactory.modifyListService(),
		);
	}

	static makeRemoveListController() {
		return new RemoveListController(
			ListServiceWithMySqlFactory.removeListService(),
		);
	}
}

module.exports = ListControllerFactory;
