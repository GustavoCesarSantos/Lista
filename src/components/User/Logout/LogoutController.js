const logger = require('../../../helpers/logger')
const LogoutRequestDTO = require('./LogoutRequestDTO')
const LogoutService = require('./LogoutService')

class Logout {
  async handler (request, response) {
    try {
      logger.info('Usuário está tentando realizar logout na aplicação.')
      const logoutRequestDTO = new LogoutRequestDTO({ ...request.token })
      const logoutService = new LogoutService()
      await logoutService.execute(logoutRequestDTO)
      logger.info('Usuário conseguiu realizar logout na aplicação.')
      response.status(204).end()
    } catch (err) {
      if (!err.httpCode) err.httpCode = 500
      logger.error(`${err.httpCode} - ${err.message}`)
      response.status(err.httpCode).send(err.message)
    }
  }
}

module.exports = Logout
