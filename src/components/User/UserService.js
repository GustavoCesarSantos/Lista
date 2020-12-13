const UserDao = require('./UserDao')

class UserService {
  async getUsers () {
    return await UserDao.getUsers()
  };

  async getUser (userId) {
    return await UserDao.getUser(userId)
  };

  async setUser (userData) {
    return await UserDao.setUser(userData)
  };

  async updateUser (userId, userData) {
    return await UserDao.updateUser(userId, userData)
  };

  async deleteUser (userId) {
    return await UserDao.deleteUser(userId)
  };
}

module.exports = new UserService()
