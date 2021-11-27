const logger = require('../../../helpers/logger')
const RemoveAnnotationRequestDTO = require('./RemoveAnnotationRequestDTO')

class RemoveAnnotationController {
  constructor (removeAnnotationService) {
    this.removeAnnotationService = removeAnnotationService
  }

  async handler (request, response) {
    try {
      logger.info('Usuário está tentando excluir uma anotação.')
      const removeAnnotationRequestDTO = new RemoveAnnotationRequestDTO({
        ...request.params
      })
      await this.removeAnnotationService.execute(removeAnnotationRequestDTO)
      logger.info('Anotação excluída com sucesso.')
      response.status(201)
      response.end()
    } catch (err) {
      if (!err.httpCode) err.httpCode = 500
      logger.error(`${err.httpCode} - ${err.message}`)
      response.status(err.httpCode)
      response.send(err.message)
    }
  }
}

module.exports = RemoveAnnotationController
