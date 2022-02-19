const CreateUserRequestDTO = require('./CreateUserRequestDTO');
const HttpResponse = require('../../../helpers/HttpResponse');
const InvalidParamError = require('../../../helpers/errors/InvalidParamError');
const MissingParamError = require('../../../helpers/errors/MissingParamError');

class CreateUserController {
	constructor(createUserService, logger, paramTypeValidator) {
		this.createUserService = createUserService;
		this.logger = logger;
		this.paramTypeValidator = paramTypeValidator;
	}

	async handle(httpRequest) {
		try {
			const { email, password } = httpRequest.body;
			const createUserRequestDTO = new CreateUserRequestDTO({
				email,
				password,
			});
			if (!email) {
				return HttpResponse.badRequest(new MissingParamError('e-mail'));
			}
			if (!password) {
				return HttpResponse.badRequest(
					new MissingParamError('password'),
				);
			}
			if (!this.paramTypeValidator.isString(email)) {
				return HttpResponse.badRequest(new InvalidParamError('email'));
			}
			if (!this.paramTypeValidator.isString(password)) {
				return HttpResponse.badRequest(
					new InvalidParamError('password'),
				);
			}
			this.logger.info('Tentando criar um usuário.');
			await this.createUserService.execute(createUserRequestDTO);
			this.logger.info(`Usuário:${email} criado com sucesso.`);
			HttpResponse.created();
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = CreateUserController;
