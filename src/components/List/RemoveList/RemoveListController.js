const logger = require('../../../helpers/logger')
const RemoveListRequestDTO = require('./RemoveListRequestDTO')
const RemoveListService = require('./RemoveListService')

class RemoveListController {
  constructor (removeListRepository) {
    this.removeListRepository = removeListRepository
  }

  async handler (request, response) {
    try {
      logger.info(`Usuário:${request.user.id} está tentando excluir uma lista:${request.params.listId}.`)
      const removeListRequestDTO = new RemoveListRequestDTO({
        ...request.params
      })
      const removeListService = new RemoveListService(this.removeListRepository)
      await removeListService.execute(removeListRequestDTO)
      logger.info(`Usuário:${request.user.id} conseguiu excluir a lista:${request.params.listId}.`)
      response.status(201).end()
    } catch (err) {
      if (!err.httpCode) err.httpCode = 500
      logger.error(`${err.httpCode} - ${err.message}`)
      response.status(err.httpCode).send(err.message)
    }
  }
}

module.exports = RemoveListController
