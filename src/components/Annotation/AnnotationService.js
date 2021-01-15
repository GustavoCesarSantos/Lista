const AnnotationDao = require('./AnnotationDao')

class AnnotationService {
  async getAnnotations (query) {
    return await AnnotationDao.getAnnotations(query)
  }

  async getAnnotation (annotationId) {
    return await AnnotationDao.getAnnotation(annotationId)
  }

  async setAnnotation (annotationData) {
    return await AnnotationDao.setAnnotation(annotationData)
  }

  async updateAnnotation (annotationData) {
    return await AnnotationDao.updateAnnotation(annotationData.id, annotationData)
  }

  async deleteAnnotation (annotationData) {
    return await AnnotationDao.deleteAnnotation(annotationData.id)
  }
}

module.exports = new AnnotationService()
