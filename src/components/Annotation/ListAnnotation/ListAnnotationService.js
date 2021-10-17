const Annotation = require('../requestsModel/AnnotationModel')
const ListAnnotationRepository = require('./ListAnnotationRepository')

class ListAnnotationService {
  async execute (listAnnotationRequestDTO) {
    const annotation = new Annotation(listAnnotationRequestDTO)
    await annotation.isValid()
    const listAnnotationRepository = new ListAnnotationRepository()
    return await listAnnotationRepository.listOne(annotation.id)
  }
}

module.exports = ListAnnotationService
