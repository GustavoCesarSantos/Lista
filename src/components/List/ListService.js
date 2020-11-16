const ListDao = require('./ListDao');

class ListService {
  async getLists() {
    return await ListDao.getLists();
  }
  
  async getList(listId) {
    return await ListDao.getList(listId);
  }

  async setList(listData) {
    return await ListDao.setList(listData);
  }

  async updateList(listId, listData) {
    return await ListDao.updateList(listId, listData);
  }

  async deleteList(listId) {
    return await ListDao.deleteList(listId);
  }
}

module.exports = new ListService();