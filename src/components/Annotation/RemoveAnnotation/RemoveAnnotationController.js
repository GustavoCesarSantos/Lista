const logger = require('../../../helpers/logger')
const RemoveAnnotationRequestDTO = require('./RemoveAnnotationRequestDTO')
const RemoveAnnotationService = require('./RemoveAnnotationService')

class RemoveAnnotationController {
  constructor (removeAnnotationRepository) {
    this.removeAnnotationRepository = removeAnnotationRepository
  }

  async handler (request, response) {
    try {
      logger.info(`Usuário:${request.user.id} está tentando excluir a anotação:${request.params.annotationId}.`)
      const removeAnnotationRequestDTO = new RemoveAnnotationRequestDTO({
        ...request.params
      })
      const removeAnnotationService = new RemoveAnnotationService(this.removeAnnotationRepository)
      await removeAnnotationService.execute(removeAnnotationRequestDTO)
      logger.info(`Usuário:${request.user.id} conseguiu excluir a anotação:${request.params.annotationId}.`)
      response.status(201).end()
    } catch (err) {
      if (!err.httpCode) err.httpCode = 500
      logger.error(`${err.httpCode} - ${err.message}`)
      response.status(err.httpCode).send(err.message)
    }
  }
}

module.exports = RemoveAnnotationController
