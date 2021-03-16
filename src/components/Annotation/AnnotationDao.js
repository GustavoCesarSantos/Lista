const models = require('../../database/models')

class AnnotationDao {
  async getAnnotations (query) {
    return await models.Annotations.findAll({ where: query })
  }

  async getAnnotation (annotationId) {
    return await models.Annotations.findByPk(annotationId)
  }

  async setAnnotation (annotationData) {
    return await models.Annotations.create(annotationData)
  }

  async updateAnnotation (annotationId, annotationData) {
    return await models.Annotations.update(annotationData, { where: { id: annotationId } })
  }

  async deleteAnnotation (annotationId) {
    return await models.Annotations.destroy({ where: { id: annotationId } })
  }
}

module.exports = new AnnotationDao()
