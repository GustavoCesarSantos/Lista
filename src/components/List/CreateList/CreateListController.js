const CreateListRequestDTO = require('./CreateListRequestDTO');
const HttpResponse = require('../../../helpers/HttpResponse');
const InvalidParamError = require('../../../helpers/errors/InvalidParamError');
const MissingParamError = require('../../../helpers/errors/MissingParamError');

class CreateListController {
	constructor(createListService, logger, paramTypeValidator) {
		this.createListService = createListService;
		this.logger = logger;
		this.paramTypeValidator = paramTypeValidator;
	}

	async handle(httpRequest) {
		try {
			const { userId } = httpRequest.params;
			const { name } = httpRequest.body;
			const { id } = httpRequest.user;
			if (!userId) {
				return HttpResponse.badRequest(
					new MissingParamError('user id'),
				);
			}
			if (!name) {
				return HttpResponse.badRequest(new MissingParamError('name'));
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
			if (!this.paramTypeValidator.isString(name)) {
				return HttpResponse.badRequest(new InvalidParamError('name'));
			}
			this.logger.info(
				`Usuário:${id} está tentando cadastrar a lista: ${name}.`,
			);
			const createListRequestDTO = new CreateListRequestDTO({
				...httpRequest.params,
				...httpRequest.body,
			});
			await this.createListService.execute(createListRequestDTO);
			this.logger.info(
				`Usuário:${id} conseguiu cadastrar a lista: ${name}.`,
			);
			return HttpResponse.created();
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = CreateListController;
