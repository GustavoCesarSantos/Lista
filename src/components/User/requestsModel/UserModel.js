class User {
  constructor (user) {
    this.id = user.id
    this.email = user.email
    this.password = user.password
    this.verifiedEmail = !user.verifiedEmail ? false : user.verifiedEmail
  }
}

module.exports = User
