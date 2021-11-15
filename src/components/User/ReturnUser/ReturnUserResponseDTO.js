class ReturnUserResponseDTO {
  constructor (user) {
    this.id = user.id
    this.email = user.email
    this.lists = user.Lists
  }
}

module.exports = ReturnUserResponseDTO
