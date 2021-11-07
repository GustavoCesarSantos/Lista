const Joi = require('joi')

const ErrorHandler = require('../../../helpers/ErrorHandler')

const schema = Joi.object({
  id: [Joi.string(), Joi.number()],
  listId: [Joi.string(), Joi.number()],
  contents: Joi.string().max(30)
})

class Annotation {
  constructor (annotation) {
    this.id = annotation.annotationId
    this.listId = annotation.listId
    this.contents = annotation.contents
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
        if (typeof this[prop] !== 'undefined') query[prop] = this[prop]
      }
      return query
    } catch (err) {
      throw new ErrorHandler(err.message, 500)
    }
  }
}

module.exports = Annotation