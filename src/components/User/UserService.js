const UserDao = require('./UserDao')

class UserService {
  static async getUsers () {
    return await UserDao.getUsers()
  };

  static async getUser (userId) {
    return await UserDao.getUser(userId)
  };

  static async setUser (userData) {
    return await UserDao.setUser(userData)
  };

  static async updateUser (userId, userData) {
    return await UserDao.updateUser(userId, userData)
  };

  static async deleteUser (userId) {
    return await UserDao.deleteUser(userId)
  };
}

module.exports = new UserService()
