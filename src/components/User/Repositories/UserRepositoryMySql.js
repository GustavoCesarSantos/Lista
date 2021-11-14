const IUserRepository = require('./IUserRepository')

class UserRepositoryMySql extends IUserRepository {
  constructor (userModel) {
    super()
    this.userModel = userModel
  }

  async create (user) {
    await this.userModel.create(user)
  }

  async findOne (userId) {
    return await this.userModel.findByPk(userId, { include: { association: 'Lists' } })
  }

  async findMany (query) {
    return await this.userModel.findAll({ where: query })
  }

  async modify (user) {
    await this.userModel.update(user, { where: { id: user.id } })
  }

  async remove (userId) {
    await this.userModel.destroy({ where: { id: userId } })
  }
}

module.exports = UserRepositoryMySql
