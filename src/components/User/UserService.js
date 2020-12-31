const bcryptHelper = require('../../helpers/bcrypt')
const tokenHelper = require('../../helpers/token')
const UserDao = require('./UserDao')
const { VerificationEmail } = require('../../helpers/email')

class UserService {
  async getUsers (query) {
    return await UserDao.getUsers(query)
  };

  async getUser (userId) {
    return await UserDao.getUser(userId)
  };

  async setUser (userData) {
    const users = await UserDao.getUsers()
    const userExists = users.filter(user => user.email === userData.email)
    if (userExists.length > 0) throw new Error('Usuário já cadastrado.')

    const newUser = { ...userData }
    newUser.password = await bcryptHelper.encryptPassword(userData.password)
    await UserDao.setUser(newUser)

    const [{ id }] = await UserDao.getUsers({ email: newUser.email })
    const idToken = tokenHelper.createToken({ id })
    newUser.id = idToken
    const verificationEmail = new VerificationEmail(newUser)
    verificationEmail.sendEmail().catch(console.log)
  };

  async updateUser (userId, userData) {
    return await UserDao.updateUser(userId, userData)
  };

  async deleteUser (userId) {
    return await UserDao.deleteUser(userId)
  };
}

module.exports = new UserService()
