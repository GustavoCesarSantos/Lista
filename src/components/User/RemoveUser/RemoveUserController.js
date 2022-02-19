const HttpResponse = require('../../../helpers/HttpResponse');
const MissingParamError = require('../../../helpers/errors/MissingParamError');
const RemoveUserRequestDTO = require('./RemoveUserRequestDTO');

class RemoveUserController {
	constructor(removeUserService, logger, paramTypeValidator) {
		this.removeUserService = removeUserService;
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
			const removeUserRequestDTO = new RemoveUserRequestDTO({ userId });
			this.logger.info(
				`Usuário:${id} está tentando remover o usuário:${userId}.`,
			);
			await this.removeUserService.execute(removeUserRequestDTO);
			this.logger.info(
				`Usuário:${id} conseguiu remover o usuário:${userId}.`,
			);
			return HttpResponse.okWithoutBody();
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = RemoveUserController;
