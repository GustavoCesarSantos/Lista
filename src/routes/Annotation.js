const authenticationToken = require('../middlewares/authenticationToken')
const AnnotationController = require('../components/Annotation/AnnotationController')

const CreateAnnotationController = require('../components/Annotation/CreateAnnotation/CreateAnnotationController')
const CreateAnnotationRepository = require('../components/Annotation/CreateAnnotation/CreateAnnotationRepository')
const ListAnnotationController = require('../components/Annotation/ListAnnotation/ListAnnotationController')
const ListAnnotationRepository = require('../components/Annotation/ListAnnotation/ListAnnotationRepository')

const createAnnotationRepository = new CreateAnnotationRepository()
const createAnnotationController = new CreateAnnotationController(createAnnotationRepository)
const listAnnotationRepository = new ListAnnotationRepository()
const listAnnotationController = new ListAnnotationController(listAnnotationRepository)

module.exports = (app) => {
  app.route('/annotations')
    .get(authenticationToken.bearer, AnnotationController.getAnnotations)

  app.route('/lists/:listId/annotations')
    .post(authenticationToken.bearer, createAnnotationController.handler.bind(createAnnotationController))

  app.route('/annotations/:annotationId')
    .get(authenticationToken.bearer, listAnnotationController.handler.bind(listAnnotationController))
    .put(authenticationToken.bearer, AnnotationController.updateAnnotation)
    .delete(authenticationToken.bearer, AnnotationController.deleteAnnotation)
}
