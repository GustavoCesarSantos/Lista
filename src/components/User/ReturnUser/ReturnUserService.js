const ErrorHandler = require('../../../helpers/ErrorHandler')
const User = require('../Entities/User')

class ReturnUserService {
  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async execute (returnUserRequestDTO) {
    const user = new User(returnUserRequestDTO)
    const validUser = await user.returnsAValidQuery()
    const userDb = await this.userRepository.findOne(validUser.id)
    if (!userDb) throw new ErrorHandler('Usuário não encontrado', 404)
    return userDb
  }
}

module.exports = ReturnUserService
