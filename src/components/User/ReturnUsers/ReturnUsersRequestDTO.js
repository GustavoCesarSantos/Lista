class ReturnUsersRequestDTO {
  constructor (user) {
    this.id = user.userId
    this.email = user.email
  }
}

module.exports = ReturnUsersRequestDTO
