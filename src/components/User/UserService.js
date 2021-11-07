const bcryptHelper = require('../../helpers/bcrypt')
const ErrorHandler = require('../../helpers/ErrorHandler')
const tokenHelper = require('../../helpers/token')
const UserDao = require('./UserDao')
const { VerificationEmail } = require('../../helpers/email')

class UserService {
  async getUsers (query) {
    return await UserDao.getUsers(query)
  };

  async getUser (userId) {
    const user = await UserDao.getUser(userId)

    if (!user) throw new ErrorHandler('Usuário não encontrado', 404)

    return user
  };

  async setUser (userData) {
    const users = await UserDao.getUsers({ email: userData.email })
    if (users.length > 0) throw new ErrorHandler('Usuário já cadastrado.', 400)

    const newUser = { ...userData }
    newUser.password = await bcryptHelper.encryptPassword(userData.password)
    await UserDao.setUser(newUser)

    const [{ id }] = await UserDao.getUsers({ email: newUser.email })
    const idToken = tokenHelper.createToken({ id })
    newUser.id = idToken
    const verificationEmail = new VerificationEmail(newUser)
    await verificationEmail.sendEmail().catch(console.log)
  };

  async updateUser (userData) {
    const user = await UserDao.getUser(userData.id)

    if (!user) throw new ErrorHandler('Usuário não encontrado', 404)

    return await UserDao.updateUser(user.id, userData)
  };

  async deleteUser (userData) {
    const user = await UserDao.getUser(userData.id)

    if (!user) throw new ErrorHandler('Usuário não encontrado', 404)

    return await UserDao.deleteUser(user.id)
  };
}

module.exports = new UserService()
