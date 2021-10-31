const ListAnnotationRequestDTO = require('./ListAnnotationRequestDTO')
const ListAnnotationService = require('./ListAnnotationService')
const logger = require('../../../helpers/logger')

class ListAnnotationController {
  constructor (listAnnotationRepository) {
    this.listAnnotationRepository = listAnnotationRepository
  }

  async handler (request, response) {
    try {
      logger.info('Usuário está tentando retornar a anotação.')
      const listAnnotationRequestDTO = new ListAnnotationRequestDTO({
        ...request.params
      })
      const listAnnotationService = new ListAnnotationService(this.listAnnotationRepository)
      const annotation = await listAnnotationService.execute(listAnnotationRequestDTO)
      response.status(200).json(annotation)
    } catch (error) {
      if (!error.httpCode) error.httpCode = 500
      logger.error(`http status code: ${error.httpCode} - ${error.message}`)
      response.status(error.httpCode).send(error.message)
    }
  }
}

module.exports = ListAnnotationController
