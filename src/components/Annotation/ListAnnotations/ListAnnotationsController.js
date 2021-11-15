const ListAnnotationsService = require('./ListAnnotationsService')
const ListAnnotationsRequestDTO = require('./ListAnnotationsRequestDTO')
const logger = require('../../../helpers/logger')

class ListAnnotationsController {
  constructor (listAnnotationsRepository) {
    this.listAnnotationsRepository = listAnnotationsRepository
  }

  async handler (request, response) {
    try {
      logger.info(`Usuário:${request.user.id} está tentando retornar todas as anotações.`)
      const listAnnotationsRequestDTO = new ListAnnotationsRequestDTO({
        ...request.query
      })
      const listAnnotationsService = new ListAnnotationsService(this.listAnnotationsRepository)
      const annotations = await listAnnotationsService.execute(listAnnotationsRequestDTO)
      logger.info(`Usuário:${request.user.id} conseguiu retornar todas as anotações.`)
      response.status(200).json(annotations)
    } catch (error) {
      if (!error.httpCode) error.httpCode = 500
      logger.error(`${error.httpCode} - ${error.message}`)
      response.status(error.httpCode).send(error.message)
    }
  }
}

module.exports = ListAnnotationsController
