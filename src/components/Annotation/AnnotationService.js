const AnnotationDao = require('./AnnotationDao');

class AnnotationService {
  async getAnnotations() {
    return await AnnotationDao.getAnnotations();
  }

  async getAnnotation(annotationId) {
    return await AnnotationDao.getAnnotation(annotationId);
  }

  async setAnnotation(annotationData) {
    return await AnnotationDao.setAnnotation(annotationData);
  }

  async updateAnnotation(annotationId, annotationData) {
    return await AnnotationDao.updateAnnotation(annotationId, annotationData);
  }

  async deleteAnnotation(annotationId) {
    return await AnnotationDao.deleteAnnotation(annotationId);
  }
}

module.exports = new AnnotationService();