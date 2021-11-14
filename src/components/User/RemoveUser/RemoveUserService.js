const ErrorHandler = require('../../../helpers/ErrorHandler')
const User = require('../Entities/User')

class RemoveUserService {
  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async execute (removeUserRequestDTO) {
    const user = new User(removeUserRequestDTO)
    await user.isValid()
    const userExists = await this.userRepository.findOne(user.id)
    if (!userExists) throw new ErrorHandler('Usuário não encontrado', 404)
    await this.userRepository.remove(user.id)
  }
}

module.exports = RemoveUserService
