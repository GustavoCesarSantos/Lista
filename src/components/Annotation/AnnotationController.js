const AnnotationService = require('./AnnotationService');

class AnnotationController {
  static async setAnnotation(req, res) {
    try {
      const { listId } = req.params;
      const annotationData = req.body;
      annotationData.listId = listId;
      await AnnotationService.setAnnotation(annotationData);
      res.status(201).send(annotationData);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

module.exports = AnnotationController;