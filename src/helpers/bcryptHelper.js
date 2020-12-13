const bcrypt = require('bcrypt')

module.exports = {
  async encryptPassword (password) {
    const salt = await bcrypt.genSalt(12)
    const encryptPassword = await bcrypt.hash(password, salt)
    return encryptPassword
  }
}
