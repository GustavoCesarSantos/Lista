const tokenHelper = require('../helpers/token');

class AuthenticationVerificationEmail {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async verify(request, response, next) {
		try {
			const { token } = request.params;
			const userId = await tokenHelper.verifyToken(token);
			const user = await this.userRepository.findOne(userId);
			user.verifiedEmail = true;
			request.user = user;
			return next();
		} catch (err) {
			if (err && err.name === 'JsonWebTokenError')
				return response.status(401).send(err.message);

			if (err && err.name === 'TokenExpiredError') {
				return response
					.status(401)
					.json({ error: err.message, expiradoEm: err.expiredAt });
			}

			return response.status(500).send(err.message);
		}
	}
}

module.exports = AuthenticationVerificationEmail;
