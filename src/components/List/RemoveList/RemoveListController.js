const logger = require('../../../helpers/logger')
const RemoveListRequestDTO = require('./RemoveListRequestDTO')
const RemoveListService = require('./RemoveListService')

class RemoveListController {
  constructor (removeListRepository) {
    this.removeListRepository = removeListRepository
  }

  async handler (request, response) {
    try {
      logger.info('Usuário está tentando excluir uma lista.')
      const removeListRequestDTO = new RemoveListRequestDTO({
        ...request.params
      })
      const removeListService = new RemoveListService(this.removeListRepository)
      await removeListService.execute(removeListRequestDTO)
      logger.info('Lista excluída com sucesso.')
      response.status(201).end()
    } catch (err) {
      if (!err.httpCode) err.httpCode = 500
      logger.error(`${err.httpCode} - ${err.message}`)
      response.status(err.httpCode).send(err.message)
    }
  }
}

module.exports = RemoveListController
