const models = require('../../../database/models')

class ListAnnotationRepository {
  async listOne (annotationId) {
    return await models.Annotations.findByPk(annotationId)
  }
}

module.exports = ListAnnotationRepository
