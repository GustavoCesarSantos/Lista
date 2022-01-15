const HttpResponse = require('../../../helpers/HttpResponse');
const InvalidParamError = require('../../../helpers/errors/InvalidParamError');
const MissingParamError = require('../../../helpers/errors/MissingParamError');
const ModifyListRequestDTO = require('./ModifyListRequestDTO');

class ModifyListController {
	constructor(modifyListService, logger, paramTypeValidator) {
		this.modifyListService = modifyListService;
		this.logger = logger;
		this.paramTypeValidator = paramTypeValidator;
	}

	async handle(httpRequest) {
		try {
			const { listId } = httpRequest.params;
			const { name } = httpRequest.body;
			const { id } = httpRequest.user;
			if (!listId) {
				return HttpResponse.badRequest(
					new MissingParamError('list id'),
				);
			}
			if (!name) {
				return HttpResponse.badRequest(new MissingParamError('name'));
			}
			if (!id) {
				return HttpResponse.badRequest(
					new MissingParamError('user id'),
				);
			}
			if (!this.paramTypeValidator.isString(listId)) {
				return HttpResponse.badRequest(
					new InvalidParamError('list id'),
				);
			}
			if (!this.paramTypeValidator.isString(name)) {
				return HttpResponse.badRequest(new InvalidParamError('name'));
			}
			this.logger.info(
				`Usuário:${id} está tentando modificar a lista:${listId}.`,
			);
			const modifyListRequestDTO = new ModifyListRequestDTO({
				...httpRequest.params,
				...httpRequest.body,
			});
			await this.modifyListService.execute(modifyListRequestDTO);
			this.logger.info(
				`Usuário:${id} conseguiu modificar a lista:${listId}.`,
			);
			return HttpResponse.okWithoutBody();
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = ModifyListController;
