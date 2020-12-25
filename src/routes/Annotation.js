const authenticationToken = require('../middlewares/authenticationToken')
const AnnotationController = require('../components/Annotation/AnnotationController')

module.exports = (app) => {
  app.route('/annotations')
    .get(authenticationToken.bearer, AnnotationController.getAnnotations)

  app.route('/lists/:listId/annotations')
    .post(authenticationToken.bearer, AnnotationController.setAnnotation)

  app.route('/annotations/:annotationId')
    .get(authenticationToken.bearer, AnnotationController.getAnnotation)
    .put(authenticationToken.bearer, AnnotationController.updateAnnotation)
    .delete(authenticationToken.bearer, AnnotationController.deleteAnnotation)
}
