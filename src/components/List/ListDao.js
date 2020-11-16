const ListsModel = require('../../database/models/Lists');

class ListDao {
  async getLists() {
    return await ListsModel.findAll();
  }

  async getList(listId) {
    return await ListsModel.findByPk(listId, { include: { association: 'Annotations' } })
  }

  async setList(listData) {
    return await ListsModel.create(listData);
  }

  async updateList(listId, listData) {
    const tt = await ListsModel.update(listData, { where: { id: listId } });
    return tt
  }
}

module.exports = new ListDao();