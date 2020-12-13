const bcrypt = require('bcrypt')

module.exports = {
  async encryptPassword (password, salt) {
    const encryptPassword = await bcrypt.hash(password, salt)
    return encryptPassword
  },

  async generateHash () {
    const salt = await bcrypt.genSalt(12)
    return salt
  }
}
