const AnnotationController = require('../components/Annotation/AnnotationController')

module.exports = (app) => {
  app.route('/annotations')
    .get(AnnotationController.getAnnotations)

  app.route('/lists/:listId/annotations')
    .post(AnnotationController.setAnnotation)

  app.route('/annotations/:annotationId')
    .get(AnnotationController.getAnnotation)
    .put(AnnotationController.updateAnnotation)
    .delete(AnnotationController.deleteAnnotation)
}
