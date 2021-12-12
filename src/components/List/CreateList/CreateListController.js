const CreateListRequestDTO = require('./CreateListRequestDTO')
const CreateListService = require('./CreateListService')
const logger = require('../../../helpers/logger')

class CreateListController {
  constructor (createListRepository) {
    this.createListRepository = createListRepository
  }

  async handler (request, response) {
    try {
      logger.info(`Usuário:${request.user.id} está tentando cadastrar uma lista.`)
      const createListRequestDTO = new CreateListRequestDTO({
        ...request.params,
        ...request.body
      })
      const createListService = new CreateListService(this.createListRepository)
      await createListService.execute(createListRequestDTO)
      logger.info(`Usuário:${request.user.id} conseguiu cadastrar a lista.`)
      response.status(201).end()
    } catch (err) {
      if (!err.httpCode) err.httpCode = 500
      logger.error(`${err.httpCode} - ${err.message}`)
      response.status(err.httpCode).send(err.message)
    }
  }
}

module.exports = CreateListController
