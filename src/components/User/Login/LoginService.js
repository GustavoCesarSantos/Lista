const tokenHelper = require('../../../helpers/token');

class LoginService {
	static async execute(loginRequestDTO) {
		const accessToken = tokenHelper.createToken(loginRequestDTO);
		const refreshToken = await tokenHelper.createOpaqueToken(
			loginRequestDTO,
		);
		return {
			accessToken,
			refreshToken,
		};
	}
}

module.exports = LoginService;
