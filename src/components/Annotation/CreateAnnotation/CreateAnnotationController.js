const CreateAnnotationRequestDTO = require('./CreateAnnotationRequestDTO')
const CreateAnnotationService = require('./CreateAnnotationService')

class CreateAnnotationController {
  static async handler (request, response) {
    try {
      const createAnnotationRequestDTO = new CreateAnnotationRequestDTO({
        ...request.params,
        ...request.body
      })
      const createAnnotationService = new CreateAnnotationService()
      await createAnnotationService.execute(createAnnotationRequestDTO)
      response.status(201).end()
    } catch (err) {
      response.status(err.httpCode).send(err.message)
    }
  }
}

module.exports = CreateAnnotationController
