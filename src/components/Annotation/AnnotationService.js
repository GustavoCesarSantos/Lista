const AnnotationDao = require('./AnnotationDao')
const ErrorHandler = require('../../helpers/ErrorHandler')

class AnnotationService {
  async getAnnotations (query) {
    return await AnnotationDao.getAnnotations(query)
  }

  async getAnnotation (annotationId) {
    const annotation = await AnnotationDao.getAnnotation(annotationId)

    if (!annotation) throw new ErrorHandler('Anotação não encontrada', 404)

    return annotation
  }

  async setAnnotation (annotationData) {
    return await AnnotationDao.setAnnotation(annotationData)
  }

  async updateAnnotation (annotationData) {
    const annotation = await AnnotationDao.getAnnotation(annotationData.id)

    if (!annotation) throw new ErrorHandler('Anotação não encontrada', 404)

    return await AnnotationDao.updateAnnotation(annotation.id, annotationData)
  }

  async deleteAnnotation (annotationData) {
    const annotation = await AnnotationDao.getAnnotation(annotationData.id)

    if (!annotation) throw new ErrorHandler('Anotação não encontrada', 404)

    return await AnnotationDao.deleteAnnotation(annotation.id)
  }
}

module.exports = new AnnotationService()
