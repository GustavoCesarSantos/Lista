const HttpResponse = require('../../../helpers/HttpResponse');
const InvalidParamError = require('../../../helpers/errors/InvalidParamError');
const MissingParamError = require('../../../helpers/errors/MissingParamError');
const RemoveListRequestDTO = require('./RemoveListRequestDTO');

class RemoveListController {
	constructor(removeListService, logger, paramTypeValidator) {
		this.removeListService = removeListService;
		this.logger = logger;
		this.paramTypeValidator = paramTypeValidator;
	}

	async handle(httpRequest) {
		try {
			const { listId } = httpRequest.params;
			const { id } = httpRequest.user;
			if (!listId) {
				return HttpResponse.badRequest(
					new MissingParamError('list id'),
				);
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
			this.logger.info(
				`Usuário:${id} está tentando excluir uma lista:${listId}.`,
			);
			const removeListRequestDTO = new RemoveListRequestDTO({
				...httpRequest.params,
			});
			await this.removeListService.execute(removeListRequestDTO);
			this.logger.info(
				`Usuário:${id} conseguiu excluir a lista:${listId}.`,
			);
			return HttpResponse.okWithoutBody();
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = RemoveListController;
