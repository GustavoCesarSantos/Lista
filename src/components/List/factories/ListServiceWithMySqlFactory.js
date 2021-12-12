const CreateListService = require('../CreateList/CreateListService');
const IListServiceFactory = require('./IListServiceFactory');
const { List } = require('../../../database/models');
const ListRepositoryMySql = require('../repositories/ListRepositoryMySql');
const ModifyListService = require('../ModifyList/ModifyListService');
const RemoveListService = require('../RemoveList/RemoveListService');
const ReturnListService = require('../ReturnList/ReturnListService');
const ReturnListsService = require('../ReturnLists/ReturnListsService');

const listRepositoryMySql = new ListRepositoryMySql(List);

class ListServiceWithMySqlFactory extends IListServiceFactory {
    createListService() {
        return new CreateListService(listRepositoryMySql);
    }

    returnListService() {
        return new ReturnListService(listRepositoryMySql);
    }

    returnListsService() {
        return new ReturnListsService(listRepositoryMySql);
    }

    modifyListService() {
        return new ModifyListService(listRepositoryMySql);
    }

    removeListService() {
        return new RemoveListService(listRepositoryMySql);
    }
}

module.exports = ListServiceWithMySqlFactory;
