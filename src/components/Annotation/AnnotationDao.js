const AnnotationsModel = require('../../database/models/Annotations');

class AnnotationDao {
  async setAnnotation(annotationData) {
    return await AnnotationsModel.create(annotationData)
  }
}

module.exports = new AnnotationDao();