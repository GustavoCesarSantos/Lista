const models = require('../../database/models')

class UserDao {
  async getUsers (query) {
    return await models.Users.findAll({ where: query })
  };

  async getUser (userId) {
    return await models.Users.findByPk(userId, { include: { association: 'Lists' } })
  };

  async setUser (userData) {
    return await models.Users.create(userData)
  };

  async updateUser (userId, userData) {
    return await models.Users.update(userData, { where: { id: userId } })
  };

  async deleteUser (userId) {
    return await models.Users.destroy({ where: { id: userId } })
  };
}

module.exports = new UserDao()
