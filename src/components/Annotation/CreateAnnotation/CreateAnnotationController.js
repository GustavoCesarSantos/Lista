const CreateAnnotationRequestDTO = require('./CreateAnnotationRequestDTO')
const CreateAnnotationService = require('./CreateAnnotationService')
const logger = require('../../../helpers/logger')

class CreateAnnotationController {
  async handler (request, response) {
    try {
      logger.info('Usuário está tentando cadastrar uma anotação.')
      const createAnnotationRequestDTO = new CreateAnnotationRequestDTO({
        ...request.params,
        ...request.body
      })
      const createAnnotationService = new CreateAnnotationService()
      await createAnnotationService.execute(createAnnotationRequestDTO)
      logger.info('Anotação cadastrada com sucesso.')
      response.status(201).end()
    } catch (err) {
      if (!err.httpCode) err.httpCode = 500
      logger.error(`http status code: ${err.httpCode} - ${err.message}`)
      response.status(err.httpCode).send(err.message)
    }
  }
}

module.exports = CreateAnnotationController
