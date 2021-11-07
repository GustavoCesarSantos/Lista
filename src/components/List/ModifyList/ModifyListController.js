const logger = require('../../../helpers/logger')
const ModifyListRequestDTO = require('./ModifyListRequestDTO')
const ModifyListService = require('./ModifyListService')

class ModifyListController {
  constructor (modifyListRepository) {
    this.modifyListRepository = modifyListRepository
  }

  async handler (request, response) {
    try {
      logger.info('Usuário está tentando modificar uma lista.')
      const modifyListRequestDTO = new ModifyListRequestDTO({
        ...request.params,
        ...request.body
      })
      const modifyListService = new ModifyListService(this.modifyListRepository)
      await modifyListService.execute(modifyListRequestDTO)
      logger.info('Lista modificada com sucesso.')
      response.status(201).end()
    } catch (err) {
      if (!err.httpCode) err.httpCode = 500
      logger.error(`${err.httpCode} - ${err.message}`)
      response.status(err.httpCode).send(err.message)
    }
  }
}

module.exports = ModifyListController
