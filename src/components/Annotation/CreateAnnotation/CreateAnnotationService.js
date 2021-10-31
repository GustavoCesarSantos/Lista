const Annotation = require('../requestsModel/AnnotationModel')

class CreateAnnotationService {
  constructor (createAnnotationRepository) {
    this.createAnnotationRepository = createAnnotationRepository
  }

  async execute (createAnnotationRequestDTO) {
    const annotation = new Annotation(createAnnotationRequestDTO)
    await annotation.isValid()
    await this.createAnnotationRepository.create(annotation)
  }
}

module.exports = CreateAnnotationService
