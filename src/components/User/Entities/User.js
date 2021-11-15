const Joi = require('joi')

const ErrorHandler = require('../../../helpers/ErrorHandler')

const schema = Joi.object({
  id: [Joi.string(), Joi.number()],
  email: Joi.string().email(),
  password: Joi.string().min(8).max(30),
  verifiedEmail: [Joi.boolean(), Joi.number()]
})

class User {
  constructor (user) {
    this.id = user.userId ? user.userId : user.id
    this.email = user.email
    this.password = user.password
    this.verifiedEmail = !user.verifiedEmail ? false : user.verifiedEmail
  }

  async isValid () {
    try {
      await schema.validateAsync(this)
    } catch (err) {
      throw new ErrorHandler(err.message, 500)
    }
  }

  async returnsAValidQuery () {
    try {
      await this.isValid()

      const query = {}
      for (const prop in this) {
        if (this[prop] !== undefined && this[prop] !== false) query[prop] = this[prop]
      }
      return query
    } catch (err) {
      throw new ErrorHandler(err.message, 500)
    }
  }
}

module.exports = User
