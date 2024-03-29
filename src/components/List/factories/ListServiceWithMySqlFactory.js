const CreateListService = require('../CreateList/CreateListService');
const { Lists } = require('../../../database/models');
const ListRepositoryMySql = require('../repositories/ListRepositoryMySql');
const ModifyListService = require('../ModifyList/ModifyListService');
const RemoveListService = require('../RemoveList/RemoveListService');
const ReturnListService = require('../ReturnList/ReturnListService');
const ReturnListsService = require('../ReturnLists/ReturnListsService');

const listRepositoryMySql = new ListRepositoryMySql(Lists);

class ListServiceWithMySqlFactory {
	static createListService() {
		return new CreateListService(listRepositoryMySql);
	}

	static returnListService() {
		return new ReturnListService(listRepositoryMySql);
	}

	static returnListsService() {
		return new ReturnListsService(listRepositoryMySql);
	}

	static modifyListService() {
		return new ModifyListService(listRepositoryMySql);
	}

	static removeListService() {
		return new RemoveListService(listRepositoryMySql);
	}
}

module.exports = ListServiceWithMySqlFactory;
