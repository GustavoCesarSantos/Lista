const tokenHelper = require('../../../helpers/token');

class LogoutService {
    static async execute(logoutRequestDTO) {
        await tokenHelper.invalidateToken(logoutRequestDTO.token);
    }
}

module.exports = LogoutService;
