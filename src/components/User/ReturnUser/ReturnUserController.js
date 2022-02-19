const HttpResponse = require('../../../helpers/HttpResponse');
const MissingParamError = require('../../../helpers/errors/MissingParamError');
const ReturnUserRequestDTO = require('./ReturnUserRequestDTO');

class ReturnUserController {
	constructor(returnUserService, logger, paramTypeValidator) {
		this.returnUserService = returnUserService;
		this.logger = logger;
		this.paramTypeValidator = paramTypeValidator;
	}

	async handle(httpRequest) {
		try {
			const { userId } = httpRequest.params;
			const { id } = httpRequest.user;
			if (!userId) {
				return HttpResponse.badRequest(
					new MissingParamError('user id'),
				);
			}
			if (!id) {
				return HttpResponse.badRequest(
					new MissingParamError('request user id'),
				);
			}
			this.logger.info(
				`Usuário:${id} está tentando retornar o usuário:${userId}.`,
			);
			const returnUserRequestDTO = new ReturnUserRequestDTO({ userId });
			const user = await this.returnUserService.execute(
				returnUserRequestDTO,
			);
			this.logger.info(
				`Usuário:${id} conseguiu retornar o usuário:${userId}.`,
			);
			return HttpResponse.ok(user);
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = ReturnUserController;
