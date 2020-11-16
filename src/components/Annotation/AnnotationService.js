const AnnotationDao = require('./AnnotationDao');

class AnnotationService {
  async setAnnotation(annotationData) {
    return await AnnotationDao.setAnnotation(annotationData);
  }
}

module.exports = new AnnotationService();