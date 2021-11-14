class CreateUserRequestDTO {
  constructor (user) {
    this.email = user.email
    this.password = user.password
  }
}

module.export = CreateUserRequestDTO
