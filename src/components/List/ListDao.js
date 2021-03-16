const models = require('../../database/models')

class ListDao {
  async getLists (query) {
    return await models.Lists.findAll({ where: query })
  }

  async getList (listId) {
    return await models.Lists.findByPk(listId, { include: { association: 'Annotations' } })
  }

  async setList (listData) {
    return await models.Lists.create(listData)
  }

  async updateList (listId, listData) {
    return await models.Lists.update(listData, { where: { id: listId } })
  }

  async deleteList (listId) {
    return await models.Lists.destroy({ where: { id: listId } })
  }
}

module.exports = new ListDao()
