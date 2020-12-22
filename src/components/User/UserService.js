const bcryptHelper = require('../../helpers/bcrypt')
const UserDao = require('./UserDao')

class UserService {
  async getUsers (query) {
    return await UserDao.getUsers(query)
  };

  async getUser (userId) {
    return await UserDao.getUser(userId)
  };

  async setUser (userData) {
    const newUser = { ...userData }
    newUser.password = await bcryptHelper.encryptPassword(userData.password)
    return await UserDao.setUser(newUser)
  };

  async updateUser (userId, userData) {
    return await UserDao.updateUser(userId, userData)
  };

  async deleteUser (userId) {
    return await UserDao.deleteUser(userId)
  };
}

module.exports = new UserService()
