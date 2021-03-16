const Annotation = require('./requestsModel/AnnotationModel')
const AnnotationService = require('./AnnotationService')

class AnnotationController {
  static async getAnnotations (req, res) {
    try {
      const annotationModel = new Annotation({ ...req.query })
      const query = await annotationModel.returnsAValidQuery()
      const annotations = await AnnotationService.getAnnotations(query)
      res.status(200).send(annotations)
    } catch (err) {
      res.status(404).send(err.message)
    }
  }

  static async getAnnotation (req, res) {
    try {
      const annotationModel = new Annotation({ ...req.params })
      await annotationModel.isValid()
      const annotation = await AnnotationService.getAnnotation(annotationModel.id)
      res.status(200).send(annotation)
    } catch (err) {
      res.status(404).send(err.message)
    }
  }

  static async setAnnotation (req, res) {
    try {
      const annotationModel = new Annotation({ ...req.params, ...req.body })
      await annotationModel.isValid()
      await AnnotationService.setAnnotation(annotationModel)
      res.status(201).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  static async updateAnnotation (req, res) {
    try {
      const annotationModel = new Annotation({ ...req.params, ...req.body })
      await annotationModel.isValid()
      await AnnotationService.updateAnnotation(annotationModel)
      res.status(204).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  static async deleteAnnotation (req, res) {
    try {
      const annotationModel = new Annotation({ ...req.params })
      await annotationModel.isValid()
      await AnnotationService.deleteAnnotation(annotationModel)
      res.status(204).end()
    } catch (err) {
      res.status(400).end()
    }
  }
}

module.exports = AnnotationController
