const CreateAnnotationRequestDTO = require('./CreateAnnotationRequestDTO')
const logger = require('../../../helpers/logger')

class CreateAnnotationController {
  constructor (createAnnotationService) {
    this.createAnnotationService = createAnnotationService
  }

  async handler (request, response) {
    try {
      logger.info('Usuário está tentando cadastrar uma anotação.')
      const createAnnotationRequestDTO = new CreateAnnotationRequestDTO({
        ...request.params,
        ...request.body
      })
      await this.createAnnotationService.execute(createAnnotationRequestDTO)
      logger.info('Anotação cadastrada com sucesso.')
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

module.exports = CreateAnnotationController
