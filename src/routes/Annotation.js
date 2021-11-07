const { Annotations } = require('../database/models')
const AnnotationRepositoryMySql = require('../components/Annotation/repositories/AnnotationRepositoryMySql')
const authenticationToken = require('../middlewares/authenticationToken')
const CreateAnnotationController = require('../components/Annotation/CreateAnnotation/CreateAnnotationController')
const ListAnnotationController = require('../components/Annotation/ListAnnotation/ListAnnotationController')
const ListAnnotationsController = require('../components/Annotation/ListAnnotations/ListAnnotationsController')
const ModifyAnnotationController = require('../components/Annotation/ModifyAnnotation/ModifyAnnotationController')
const RemoveAnnotationController = require('../components/Annotation/RemoveAnnotation/RemoveAnnotationController')

const annotationRepositoryMySql = new AnnotationRepositoryMySql(Annotations)
const createAnnotationController = new CreateAnnotationController(annotationRepositoryMySql)
const listAnnotationController = new ListAnnotationController(annotationRepositoryMySql)
const listAnnotationsController = new ListAnnotationsController(annotationRepositoryMySql)
const modifyAnnotationController = new ModifyAnnotationController(annotationRepositoryMySql)
const removeAnnotationController = new RemoveAnnotationController(annotationRepositoryMySql)

module.exports = (app) => {
  app.route('/annotations')
    .get(authenticationToken.bearer, listAnnotationsController.handler.bind(listAnnotationsController))

  app.route('/lists/:listId/annotations')
    .post(authenticationToken.bearer, createAnnotationController.handler.bind(createAnnotationController))

  app.route('/annotations/:annotationId')
    .get(authenticationToken.bearer, listAnnotationController.handler.bind(listAnnotationController))
    .patch(authenticationToken.bearer, modifyAnnotationController.handler.bind(modifyAnnotationController))
    .delete(authenticationToken.bearer, removeAnnotationController.handler.bind(removeAnnotationController))
}
