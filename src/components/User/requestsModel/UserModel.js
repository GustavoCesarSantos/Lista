const Joi = require('joi')

const schema = Joi.object({
  id: [Joi.string(), Joi.number()],
  email: Joi.string().email(),
  password: Joi.string(),
  verifiedEmail: [Joi.boolean(), Joi.number()]
})

class User {
  constructor (user) {
    this.id = user.userId
    this.email = user.email
    this.password = user.password
    this.verifiedEmail = !user.verifiedEmail ? false : user.verifiedEmail
  }

  async isValid () {
    try {
      await schema.validateAsync(this)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async returnsAValidQuery () {
    try {
      await this.isValid()

      const query = {}
      for (const prop in this) {
        if (typeof this[prop] !== 'undefined') query[prop] = this[prop]
      }
      return query
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

module.exports = User
