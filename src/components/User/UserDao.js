const UsersModel = require('../../database/models/Users')

class UserDao {
  static async getUsers () {
    return await UsersModel.findAll()
  };

  static async getUser (userId) {
    return await UsersModel.findByPk(userId, { include: { association: 'Lists' } })
  };

  static async setUser (userData) {
    return await UsersModel.create(userData)
  };

  static async updateUser (userId, userData) {
    return await UsersModel.update(userData, { where: { id: userId } })
  };

  static async deleteUser (userId) {
    return await UsersModel.destroy({ where: { id: userId } })
  };
}

module.exports = new UserDao()
