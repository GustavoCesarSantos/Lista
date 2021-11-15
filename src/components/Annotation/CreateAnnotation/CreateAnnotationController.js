const CreateAnnotationRequestDTO = require('./CreateAnnotationRequestDTO')
const CreateAnnotationService = require('./CreateAnnotationService')
const logger = require('../../../helpers/logger')

class CreateAnnotationController {
  constructor (createAnnotationRepository) {
    this.createAnnotationRepository = createAnnotationRepository
  }

  async handler (request, response) {
    try {
      logger.info(`Usuário:${request.user.id} está tentando cadastrar uma anotação.`)
      const createAnnotationRequestDTO = new CreateAnnotationRequestDTO({
        ...request.params,
        ...request.body
      })
      const createAnnotationService = new CreateAnnotationService(this.createAnnotationRepository)
      await createAnnotationService.execute(createAnnotationRequestDTO)
      logger.info(`Usuário:${request.user.id} conseguiu cadastrar anotação.`)
      response.status(201).end()
    } catch (err) {
      if (!err.httpCode) err.httpCode = 500
      logger.error(`${err.httpCode} - ${err.message}`)
      response.status(err.httpCode).send(err.message)
    }
  }
}

module.exports = CreateAnnotationController
