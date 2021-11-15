const logger = require('../../../helpers/logger')
const ModifyAnnotationRequestDTO = require('./ModifyAnnotationRequestDTO')
const ModifyAnnotationService = require('./ModifyAnnotationService')

class ModifyAnnotationController {
  constructor (modifyAnnotationRepository) {
    this.modifyAnnotationRepository = modifyAnnotationRepository
  }

  async handler (request, response) {
    try {
      logger.info(`Usuário:${request.user.id} está tentando modificar a anotação:${request.params.annotationId}.`)
      const modifyAnnotationRequestDTO = new ModifyAnnotationRequestDTO({
        ...request.params,
        ...request.body
      })
      const modifyAnnotationService = new ModifyAnnotationService(this.modifyAnnotationRepository)
      await modifyAnnotationService.execute(modifyAnnotationRequestDTO)
      logger.info(`Usuário:${request.user.id} conseguiu modificar a anotação:${request.params.annotationId}.`)
      response.status(201).end()
    } catch (err) {
      if (!err.httpCode) err.httpCode = 500
      logger.error(`${err.httpCode} - ${err.message}`)
      response.status(err.httpCode).send(err.message)
    }
  }
}

module.exports = ModifyAnnotationController
