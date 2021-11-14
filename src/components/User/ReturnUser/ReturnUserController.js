const logger = require('../../../helpers/logger')
const ReturnUserRequestDTO = require('./ReturnUserRequestDTO')
const ReturnUserService = require('./ReturnUserService')

class ReturnUserController {
  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async handler (request, response) {
    try {
      logger.info('Usuário está tentando retornar o usuário.')
      const returnUserRequestDTO = new ReturnUserRequestDTO({ ...request.params })
      const returnUserService = new ReturnUserService(this.userRepository)
      const user = await returnUserService.execute(returnUserRequestDTO)
      logger.info('Usuário conseguiu retornar o usuário.')
      response.status(200).json(user)
    } catch (err) {
      if (!err.httpCode) err.httpCode = 500
      logger.error(`${err.httpCode} - ${err.message}`)
      response.status(err.httpCode).send(err.message)
    }
  }
}

module.exports = ReturnUserController