const User = require('../Entities/User')

class ReturnUsersService {
  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async execute (returnUsersRequestDTO) {
    const user = new User(returnUsersRequestDTO)
    const validQuery = await user.returnsAValidQuery()
    return await this.userRepository.findMany(validQuery)
  }
}

module.exports = ReturnUsersService
