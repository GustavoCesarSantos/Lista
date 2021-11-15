class ModifyUserRequestDTO {
  constructor (user) {
    this.id = user.userId
    this.email = user.email
  }
}

module.exports = ModifyUserRequestDTO
