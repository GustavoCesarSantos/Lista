const models = require('../../../database/models')

class CreateAnnotationRepository {
  async create (annotation) {
    await models.Annotations.create(annotation)
  }
}

module.exports = CreateAnnotationRepository
