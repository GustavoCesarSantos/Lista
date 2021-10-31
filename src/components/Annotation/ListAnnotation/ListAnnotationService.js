const Annotation = require('../requestsModel/AnnotationModel')
const ListAnnotationResponseDTO = require('./ListAnnotationResponseDTO')

class ListAnnotationService {
  constructor (listAnnotationRepository) {
    this.listAnnotationRepository = listAnnotationRepository
  }

  async execute (listAnnotationRequestDTO) {
    const annotation = new Annotation(listAnnotationRequestDTO)
    await annotation.isValid()
    const annotationDb = await this.listAnnotationRepository.listOne(annotation.id)
    return new ListAnnotationResponseDTO(annotationDb)
  }
}

module.exports = ListAnnotationService
