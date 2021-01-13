const ListDao = require('./ListDao')

class ListService {
  async getLists (query) {
    return await ListDao.getLists(query)
  };

  async getList (listId) {
    return await ListDao.getList(listId)
  }

  async setList (listData) {
    return await ListDao.setList(listData)
  }

  async updateList (listData) {
    return await ListDao.updateList(listData.id, listData)
  }

  async deleteList (listId) {
    return await ListDao.deleteList(listId)
  }
}

module.exports = new ListService()
