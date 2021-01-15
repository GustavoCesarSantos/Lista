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

  async deleteList (listData) {
    return await ListDao.deleteList(listData.id)
  }
}

module.exports = new ListService()
