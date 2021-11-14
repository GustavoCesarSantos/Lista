class ModifyUserRequestDTO {
  constructor (user) {
    this.id = user.userId
    this.email = user.email
    this.password = user.password
  }
}

module.exports = ModifyUserRequestDTO
