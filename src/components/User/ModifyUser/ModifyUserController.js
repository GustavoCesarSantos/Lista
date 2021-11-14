const logger = require('../../../helpers/logger')
const ModifyUserRequestDTO = require('./ModifyUserRequestDTO')
const ModifyUserService = require('./ModifyUserService')

class ModifyUserController {
  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async handler (request, response) {
    try {
      logger.info('Tentando modificar um usuário.')
      const modifyUserRequestDTO = new ModifyUserRequestDTO({
        ...request.params,
        ...request.body
      })
      const modifyUserService = new ModifyUserService(this.userRepository)
      await modifyUserService.execute(modifyUserRequestDTO)
      logger.info('Usuário modificado com sucesso.')
      response.status(204).end()
    } catch (err) {
      if (!err.httpCode) err.httpCode = 500
      logger.error(`${err.httpCode} - ${err.message}`)
      response.status(err.httpCode).send(err.message)
    }
  }
}

module.exports = ModifyUserController
