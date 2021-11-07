const logger = require('../../../helpers/logger')
const ReturnListsService = require('./ReturnListsService')
const ReturnListsRequestDTO = require('./ReturnListsRequestDTO')

class ReturnListsController {
  constructor (returnListsRepository) {
    this.returnListsRepository = returnListsRepository
  }

  async handler (request, response) {
    try {
      logger.info('Usuário está tentando retornar todas as listas.')
      const returnListsRequestDTO = new ReturnListsRequestDTO({
        ...request.query
      })
      const returnListsService = new ReturnListsService(this.returnListsRepository)
      const lists = await returnListsService.execute(returnListsRequestDTO)
      logger.info('Usuário conseguiu retornar todas as listas.')
      response.status(200).json(lists)
    } catch (error) {
      if (!error.httpCode) error.httpCode = 500
      logger.error(`${error.httpCode} - ${error.message}`)
      response.status(error.httpCode).send(error.message)
    }
  }
}

module.exports = ReturnListsController
