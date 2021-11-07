const Annotation = require('../requestsModel/AnnotationModel')

class ListAnnotationsService {
  constructor (annotationRepository) {
    this.annotationRepository = annotationRepository
  }

  async execute (listAnnotationsRequestDTO) {
    const annotation = new Annotation(listAnnotationsRequestDTO)
    await annotation.returnsAValidQuery()
    return await this.annotationRepository.findMany(annotation)
  }
}

module.exports = ListAnnotationsService
