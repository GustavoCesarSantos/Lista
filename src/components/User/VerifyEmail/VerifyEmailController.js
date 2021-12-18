const logger = require('../../../helpers/logger');
const VerifyEmailRequestDTO = require('./VerifyEmailRequestDTO');
const VerifyEmailService = require('./VerifyEmailService');

class VerifyEmailController {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async handler(request, response) {
		try {
			logger.info(
				`Usuário:${request.user.id} está tentando validar seu e-mail.`,
			);
			const verifyEmailRequestDTO = new VerifyEmailRequestDTO(
				request.user,
			);
			const verifyEmailService = new VerifyEmailService(
				this.userRepository,
			);
			await verifyEmailService.execute(verifyEmailRequestDTO);
			logger.info(
				`Usuário:${request.user.id} conseguiu validar seu e-mail.`,
			);
			response.status(204).end();
		} catch (err) {
			if (!err.httpCode) err.httpCode = 500;
			logger.error(`${err.httpCode} - ${err.message}`);
			response.status(err.httpCode).send(err.message);
		}
	}
}

module.exports = VerifyEmailController;
