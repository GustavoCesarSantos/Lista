const HttpResponse = require('../../../helpers/HttpResponse');
const InvalidParamError = require('../../../helpers/errors/InvalidParamError');
const MissingParamError = require('../../../helpers/errors/MissingParamError');
const ModifyUserRequestDTO = require('./ModifyUserRequestDTO');

class ModifyUserController {
	constructor(modifyUserService, logger, paramTypeValidator) {
		this.modifyUserService = modifyUserService;
		this.logger = logger;
		this.paramTypeValidator = paramTypeValidator;
	}

	async handle(httpRequest) {
		try {
			const { userId } = httpRequest.params;
			const { email } = httpRequest.body;
			const { id } = httpRequest.user;
			if (!userId) {
				return HttpResponse.badRequest(
					new MissingParamError('user id'),
				);
			}
			if (!email) {
				return HttpResponse.badRequest(new MissingParamError('email'));
			}
			if (!id) {
				return HttpResponse.badRequest(
					new MissingParamError('request user id'),
				);
			}
			if (!this.paramTypeValidator.isString(userId)) {
				return HttpResponse.badRequest(
					new InvalidParamError('user id'),
				);
			}
			if (!this.paramTypeValidator.isString(email)) {
				return HttpResponse.badRequest(new InvalidParamError('email'));
			}
			const modifyUserRequestDTO = new ModifyUserRequestDTO({
				userId,
				email,
			});
			this.logger.info(
				`Usuário:${id} está tentando modificar o usuário:${userId}.`,
			);
			await this.modifyUserService.execute(modifyUserRequestDTO);
			this.logger.info(
				`Usuário:${id} conseguiu modificar o usuário:${userId}.`,
			);
			return HttpResponse.okWithoutBody();
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = ModifyUserController;
