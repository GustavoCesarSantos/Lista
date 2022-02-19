const HttpResponse = require('../../../helpers/HttpResponse');
const LoginRequestDTO = require('./LoginRequestDTO');
const MissingParamError = require('../../../helpers/errors/MissingParamError');

class Login {
	constructor(loginService, logger, paramTypeValidator) {
		this.loginService = loginService;
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
			const loginRequestDTO = new LoginRequestDTO({ id });
			this.logger.info(
				`Usuário:${id} está tentando realizar login na aplicação.`,
			);
			const { accessToken, refreshToken } =
				await this.loginService.execute(loginRequestDTO);
			this.logger.info(
				`Usuário:${id} conseguiu realizar login na aplicação.`,
			);
			return HttpResponse.ok({ refreshToken, accessToken });
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = Login;
