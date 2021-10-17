const ListAnnotationRequestDTO = require('./ListAnnotationRequestDTO')
const ListAnnotationResponseDTO = require('./ListAnnotationResponseDTO')
const ListAnnotationService = require('./ListAnnotationService')
const logger = require('../../../helpers/logger')

class ListAnnotationController {
  async handler (request, response) {
    try {
      logger.info('Usuário está tentando retornar a anotação.')
      const listAnnotationRequestDTO = new ListAnnotationRequestDTO({
        ...request.params
      })
      const listAnnotationService = new ListAnnotationService()
      const annotation = listAnnotationService.execute(listAnnotationRequestDTO)
      const listAnnotationResponseDTO = new ListAnnotationResponseDTO(annotation)
      response.status(200).json(listAnnotationResponseDTO)
    } catch (error) {
      if (!error.httpCode) error.httpCode = 500
      logger.error(`http status code: ${error.httpCode} - ${error.message}`)
      response.status(error.httpCode).send(error.message)
    }
  }
}

module.exports = ListAnnotationController
