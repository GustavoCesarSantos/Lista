const authenticationToken = require('../middlewares/authenticationToken')
const AnnotationController = require('../components/Annotation/AnnotationController')

const CreateAnnotationController = require('../components/Annotation/CreateAnnotation/CreateAnnotationController')

const createAnnotationController = new CreateAnnotationController()

module.exports = (app) => {
  app.route('/annotations')
    .get(authenticationToken.bearer, AnnotationController.getAnnotations)

  app.route('/lists/:listId/annotations')
    .post(authenticationToken.bearer, createAnnotationController.handler)

  app.route('/annotations/:annotationId')
    .get(authenticationToken.bearer, AnnotationController.getAnnotation)
    .put(authenticationToken.bearer, AnnotationController.updateAnnotation)
    .delete(authenticationToken.bearer, AnnotationController.deleteAnnotation)
}
