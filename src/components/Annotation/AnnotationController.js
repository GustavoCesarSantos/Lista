const AnnotationService = require('./AnnotationService')

class AnnotationController {
  static async getAnnotations (req, res) {
    try {
      const annotations = await AnnotationService.getAnnotations()
      res.status(200).send(annotations)
    } catch (err) {
      res.status(404).send(err.message)
    }
  }

  static async getAnnotation (req, res) {
    try {
      const { annotationId } = req.params
      const annotation = await AnnotationService.getAnnotation(annotationId)
      res.status(200).send(annotation)
    } catch (err) {
      res.status(404).send(err.message)
    }
  }

  static async setAnnotation (req, res) {
    try {
      const { listId } = req.params
      const annotationData = req.body
      annotationData.listId = listId
      await AnnotationService.setAnnotation(annotationData)
      res.status(201).send(annotationData)
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  static async updateAnnotation (req, res) {
    try {
      const { annotationId } = req.params
      const annotationData = req.body
      await AnnotationService.updateAnnotation(annotationId, annotationData)
      res.status(204).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  static async deleteAnnotation (req, res) {
    try {
      const { annotationId } = req.params
      await AnnotationService.deleteAnnotation(annotationId)
      res.status(204).end()
    } catch (err) {
      res.status(400).end()
    }
  }
}

module.exports = AnnotationController
