const tokenHelper = require('../helpers/token');

class AuthenticationRefreshToken {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async refresh(request, response, next) {
		try {
			const { refreshToken } = request.body;
			const userId = await tokenHelper.verifyOpaqueToken(refreshToken);
			await tokenHelper.invalidateOpaqueToken(refreshToken);
			request.user = await this.userRepository.findOne(userId);
			return next();
		} catch (err) {
			if (err.name === 'InvalidArgumentError')
				response.status(401).send(err.message);
			return response.status(err.httpCode).send(err.message);
		}
	}
}

module.exports = AuthenticationRefreshToken;
