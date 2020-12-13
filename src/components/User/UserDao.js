const UsersModel = require('../../database/models/Users')

class UserDao {
  async getUsers () {
    return await UsersModel.findAll()
  };

  async getUser (userId) {
    return await UsersModel.findByPk(userId, { include: { association: 'Lists' } })
  };

  async setUser (userData) {
    return await UsersModel.create(userData)
  };

  async updateUser (userId, userData) {
    return await UsersModel.update(userData, { where: { id: userId } })
  };

  async deleteUser (userId) {
    return await UsersModel.destroy({ where: { id: userId } })
  };
}

module.exports = new UserDao()
