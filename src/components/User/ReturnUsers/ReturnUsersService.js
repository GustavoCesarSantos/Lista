const ReturnUsersResponseDTO = require('./ReturnUsersResponseDTO')
const User = require('../Entities/User')

class ReturnUsersService {
  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async execute (returnUsersRequestDTO) {
    const user = new User(returnUsersRequestDTO)
    const validQuery = await user.returnsAValidQuery()
    const usersDb = await this.userRepository.findMany(validQuery)
    return usersDb.map(user => new ReturnUsersResponseDTO(user))
  }
}

module.exports = ReturnUsersService
