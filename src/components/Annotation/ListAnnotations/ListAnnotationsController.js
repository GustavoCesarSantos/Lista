const ListAnnotationsRequestDTO = require('./ListAnnotationsRequestDTO')
const logger = require('../../../helpers/logger')

class ListAnnotationsController {
  constructor (listAnnotationsService) {
    this.listAnnotationsService = listAnnotationsService
  }

  async handler (request, response) {
    try {
      logger.info(`Usuário:${request.user.id} está tentando retornar todas as anotações.`)
      const listAnnotationsRequestDTO = new ListAnnotationsRequestDTO({
        ...request.query
      })
      const annotations = await this.listAnnotationsService.execute(listAnnotationsRequestDTO)
      logger.info('Usuário conseguiu retornar todas as anotações.')
      response.status(200)
      response.json(annotations)
    } catch (error) {
      if (!error.httpCode) error.httpCode = 500
      logger.error(`${error.httpCode} - ${error.message}`)
      response.status(error.httpCode)
      response.send(error.message)
    }
  }
}

module.exports = ListAnnotationsController
