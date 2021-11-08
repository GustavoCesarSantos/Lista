const tokenHelper = require('../../../helpers/token')

class LogoutService {
  async execute (logoutRequestDTO) {
    await tokenHelper.invalidateToken(logoutRequestDTO.token)
  }
}

module.exports = LogoutService
