const logger = require('../../../helpers/logger')
const RemoveAnnotationRequestDTO = require('./RemoveAnnotationRequestDTO')
const RemoveAnnotationService = require('./RemoveAnnotationService')

class RemoveAnnotationController {
  constructor (removeAnnotationRepository) {
    this.removeAnnotationRepository = removeAnnotationRepository
  }

  async handler (request, response) {
    try {
      logger.info('Usuário está tentando excluir uma anotação.')
      const removeAnnotationRequestDTO = new RemoveAnnotationRequestDTO({
        ...request.params
      })
      const removeAnnotationService = new RemoveAnnotationService(this.removeAnnotationRepository)
      await removeAnnotationService.execute(removeAnnotationRequestDTO)
      logger.info('Anotação excluída com sucesso.')
      response.status(201).end()
    } catch (err) {
      if (!err.httpCode) err.httpCode = 500
      logger.error(`${err.httpCode} - ${err.message}`)
      response.status(err.httpCode).send(err.message)
    }
  }
}

module.exports = RemoveAnnotationController
