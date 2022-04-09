const ListServiceWithMySqlFactory = require('./ListServiceWithMySqlFactory');
const CreateListController = require('../CreateList/CreateListController');
const ModifyListController = require('../ModifyList/ModifyListController');
const RemoveListController = require('../RemoveList/RemoveListController');
const ReturnListController = require('../ReturnList/ReturnListController');
const ReturnListsController = require('../ReturnLists/ReturnListsController');
const WinstonLog = require('../../../helpers/logs/WinstonLog');
const ParamTypeValidator = require('../../../helpers/ParamTypeValidator');

class ListControllerFactory {
	static makeCreateListController() {
		return new CreateListController(
			ListServiceWithMySqlFactory.createListService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeReturnListController() {
		return new ReturnListController(
			ListServiceWithMySqlFactory.returnListService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeReturnListsController() {
		return new ReturnListsController(
			ListServiceWithMySqlFactory.returnListsService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeModifyListController() {
		return new ModifyListController(
			ListServiceWithMySqlFactory.modifyListService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeRemoveListController() {
		return new RemoveListController(
			ListServiceWithMySqlFactory.removeListService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}
}

module.exports = ListControllerFactory;
