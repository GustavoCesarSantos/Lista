const Joi = require('joi')

const schema = Joi.object({
  id: [Joi.string(), Joi.number()],
  userId: [Joi.string(), Joi.number()],
  name: Joi.string().max(30)
})

class List {
  constructor (list) {
    this.id = list.listId
    this.userId = list.userId
    this.name = list.name
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

module.exports = List
