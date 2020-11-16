const ListsModel = require('../../database/models/Lists');

class ListDao {
  async setList(listData) {
    return await ListsModel.create(listData);
  }

  async getList(listId) {
    return await ListsModel.findByPk(listId, { include: { association: 'Annotations' } })
  }
}

module.exports = new ListDao();