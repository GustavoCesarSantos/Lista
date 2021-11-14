const logger = require('../../../helpers/logger')
const LoginRequestDTO = require('./LoginRequestDTO')
const LoginService = require('./LoginService')

class Login {
  async handler (request, response) {
    try {
      logger.info(`Usuário: ${request.user} está tentando realizar login na aplicação.`)
      const loginRequestDTO = new LoginRequestDTO({ ...request.user })
      const loginService = new LoginService()
      const { accessToken, refreshToken } = await loginService.execute(loginRequestDTO)
      logger.info(`Usuário: ${request.user} conseguiu realizar login na aplicação.`)
      response.set('Authorization', accessToken)
      response.status(200).json({ refreshToken })
    } catch (err) {
      if (!err.httpCode) err.httpCode = 500
      logger.error(`${err.httpCode} - ${err.message}`)
      response.status(err.httpCode).send(err.message)
    }
  }
}

module.exports = Login
