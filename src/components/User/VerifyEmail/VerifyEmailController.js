const HttpResponse = require('../../../helpers/HttpResponse');
const MissingParamError = require('../../../helpers/errors/MissingParamError');
const VerifyEmailRequestDTO = require('./VerifyEmailRequestDTO');

class VerifyEmailController {
	constructor(verifyEmailService, logger, paramTypeValidator) {
		this.verifyEmailService = verifyEmailService;
		this.logger = logger;
		this.paramTypeValidator = paramTypeValidator;
	}

	async handle(httpRequest) {
		try {
			const { id } = httpRequest.user;
			if (!id) {
				return HttpResponse.badRequest(
					new MissingParamError('request user id'),
				);
			}
			this.logger.info(`Usuário:${id} está tentando validar seu e-mail.`);
			const verifyEmailRequestDTO = new VerifyEmailRequestDTO({ id });
			await this.verifyEmailService.execute(verifyEmailRequestDTO);
			this.logger.info(`Usuário:${id} conseguiu validar seu e-mail.`);
			return HttpResponse.okWithoutBody();
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = VerifyEmailController;
