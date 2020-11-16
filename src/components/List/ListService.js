const ListDao = require('./ListDao');

class ListService {
  async setList(listData) {
    return await ListDao.setList(listData);
  }

  async getList(listId) {
    return await ListDao.getList(listId);
  }
}

module.exports = new ListService();