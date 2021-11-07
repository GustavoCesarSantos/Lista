const Annotation = require('../requestsModel/AnnotationModel')
const ErrorHandler = require('../../../helpers/ErrorHandler')
const ListAnnotationResponseDTO = require('./ListAnnotationResponseDTO')

class ListAnnotationService {
  constructor (annotationRepository) {
    this.annotationRepository = annotationRepository
  }

  async execute (listAnnotationRequestDTO) {
    const annotation = new Annotation(listAnnotationRequestDTO)
    await annotation.isValid()
    const annotationDb = await this.annotationRepository.findOne(annotation.id)
    if (!annotationDb) throw new ErrorHandler('Anotação não encontrada', 404)
    return new ListAnnotationResponseDTO(annotationDb)
  }
}

module.exports = ListAnnotationService
