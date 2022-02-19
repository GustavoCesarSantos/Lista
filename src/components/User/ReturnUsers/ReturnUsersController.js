const HttpResponse = require('../../../helpers/HttpResponse');
const MissingParamError = require('../../../helpers/errors/MissingParamError');
const ReturnUsersRequestDTO = require('./ReturnUsersRequestDTO');

class ReturnUsersController {
	constructor(returnUsersService, logger, paramTypeValidator) {
		this.returnUsersService = returnUsersService;
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
			this.logger.info(
				`Usuário:${id} está tentando retornar todos os usuários.`,
			);
			const returnUsersRequestDTO = new ReturnUsersRequestDTO({
				...httpRequest.query,
			});
			const users = await this.returnUsersService.execute(
				returnUsersRequestDTO,
			);
			this.logger.info(
				`Usuário:${id} conseguiu retornar todos os usuários.`,
			);
			return HttpResponse.ok(users);
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = ReturnUsersController;
