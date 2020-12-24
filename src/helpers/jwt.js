const jwt = require('jsonwebtoken')

module.exports = {
  createToken (user) {
    const payload = {
      id: user.id
    }

    const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: '15m' })
    return token
  }
}
