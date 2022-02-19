const HttpResponse = require('../../../helpers/HttpResponse');
const LogoutRequestDTO = require('./LogoutRequestDTO');
const MissingParamError = require('../../../helpers/errors/MissingParamError');

class Logout {
	constructor(logoutService, logger, paramTypeValidator) {
		this.logoutService = logoutService;
		this.logger = logger;
		this.paramTypeValidator = paramTypeValidator;
	}

	async handle(httpRequest) {
		try {
			const { id } = httpRequest.user;
			const { token } = httpRequest;
			if (!id) {
				return HttpResponse.badRequest(
					new MissingParamError('request user id'),
				);
			}
			if (!token) {
				return HttpResponse.badRequest(
					new MissingParamError('access token'),
				);
			}
			const logoutRequestDTO = new LogoutRequestDTO(token);
			this.logger.info(
				`Usuário:${id} está tentando realizar logout na aplicação.`,
			);
			await this.logoutService.execute(logoutRequestDTO);
			this.logger.info(
				`Usuário:${id} conseguiu realizar logout na aplicação.`,
			);
			return HttpResponse.okWithoutBody();
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = Logout;
