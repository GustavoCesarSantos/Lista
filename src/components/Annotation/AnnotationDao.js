const AnnotationsModel = require('../../database/models/Annotations')

class AnnotationDao {
  async getAnnotations () {
    return await AnnotationsModel.findAll()
  }

  async getAnnotation (annotationId) {
    return await AnnotationsModel.findByPk(annotationId)
  }

  async setAnnotation (annotationData) {
    return await AnnotationsModel.create(annotationData)
  }

  async updateAnnotation (annotationId, annotationData) {
    return await AnnotationsModel.update(annotationData, { where: { id: annotationId } })
  }

  async deleteAnnotation (annotationId) {
    return await AnnotationsModel.destroy({ where: { id: annotationId } })
  }
}

module.exports = new AnnotationDao()
