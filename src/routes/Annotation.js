const AnnotationController = require('../components/Annotation/AnnotationController');

module.exports = (app) => {
  app.route('/lists/:listId/annotations')
  .post(AnnotationController.setAnnotation)
}