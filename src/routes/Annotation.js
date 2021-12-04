const { Annotations } = require('../database/models')

const authenticationToken = require('../middlewares/authenticationToken')

const AnnotationRepositoryMySql = require('../components/Annotation/Repositories/AnnotationRepositoryMySql')

const CreateAnnotationController = require('../components/Annotation/CreateAnnotation/CreateAnnotationController')
const ListAnnotationController = require('../components/Annotation/ListAnnotation/ListAnnotationController')
const ListAnnotationsController = require('../components/Annotation/ListAnnotations/ListAnnotationsController')
const ModifyAnnotationController = require('../components/Annotation/ModifyAnnotation/ModifyAnnotationController')
const RemoveAnnotationController = require('../components/Annotation/RemoveAnnotation/RemoveAnnotationController')

const CreateAnnotationService = require('../components/Annotation/CreateAnnotation/CreateAnnotationService')
const ListAnnotationService = require('../components/Annotation/ListAnnotation/ListAnnotationService')
const ListAnnotationsService = require('../components/Annotation/ListAnnotations/ListAnnotationsService')
const ModifyAnnotationService = require('../components/Annotation/ModifyAnnotation/ModifyAnnotationService')
const RemoveAnnotationService = require('../components/Annotation/RemoveAnnotation/RemoveAnnotationService')

const annotationRepositoryMySql = new AnnotationRepositoryMySql(Annotations)

const createAnnotationService = new CreateAnnotationService(annotationRepositoryMySql)
const listAnnotationService = new ListAnnotationService(annotationRepositoryMySql)
const listAnnotationsService = new ListAnnotationsService(annotationRepositoryMySql)
const modifyAnnotationService = new ModifyAnnotationService(annotationRepositoryMySql)
const removeAnnotationService = new RemoveAnnotationService(annotationRepositoryMySql)

const createAnnotationController = new CreateAnnotationController(createAnnotationService)
const listAnnotationController = new ListAnnotationController(listAnnotationService)
const listAnnotationsController = new ListAnnotationsController(listAnnotationsService)
const modifyAnnotationController = new ModifyAnnotationController(modifyAnnotationService)
const removeAnnotationController = new RemoveAnnotationController(removeAnnotationService)

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
