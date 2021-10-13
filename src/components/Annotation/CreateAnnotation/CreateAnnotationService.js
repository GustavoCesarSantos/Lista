const Annotation = require('../requestsModel/AnnotationModel')
const CreateAnnotationRepository = require('./CreateAnnotationRepository')

class CreateAnnotationService {
  async execute (createAnnotationRequestDTO) {
    const annotation = new Annotation(createAnnotationRequestDTO)
    await annotation.isValid()
    const createAnnotationRepository = new CreateAnnotationRepository()
    await createAnnotationRepository.create(annotation)
  }
}

module.exports = CreateAnnotationService
