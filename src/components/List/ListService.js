const ErrorHandler = require('../../helpers/ErrorHandler')
const ListDao = require('./ListDao')

class ListService {
  async getLists (query) {
    return await ListDao.getLists(query)
  };

  async getList (listId) {
    const list = await ListDao.getList(listId)

    if (!list) throw new ErrorHandler('Lista não encontrada', 404)

    return list
  }

  async setList (listData) {
    return await ListDao.setList(listData)
  }

  async updateList (listData) {
    const list = await ListDao.getList(listData.id)

    if (!list) throw new ErrorHandler('Lista não encontrada', 404)

    return await ListDao.updateList(list.id, listData)
  }

  async deleteList (listData) {
    const list = await ListDao.getList(listData.id)

    if (!list) throw new ErrorHandler('Lista não encontrada', 404)

    return await ListDao.deleteList(list.id)
  }
}

module.exports = new ListService()
