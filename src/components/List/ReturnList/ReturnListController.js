const HttpResponse = require('../../../helpers/HttpResponse');
const InvalidParamError = require('../../../helpers/errors/InvalidParamError');
const MissingParamError = require('../../../helpers/errors/MissingParamError');
const ReturnListRequestDTO = require('./ReturnListRequestDTO');

class ReturnListController {
	constructor(returnListService, logger, paramTypeValidator) {
		this.returnListService = returnListService;
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
				`Usuário:${id} está tentando retornar a lista:${listId}.`,
			);
			const returnListRequestDTO = new ReturnListRequestDTO({
				...httpRequest.params,
			});
			const list = await this.returnListService.execute(
				returnListRequestDTO,
			);
			this.logger.info(
				`Usuário:${id} conseguiu retornar a lista:${listId}.`,
			);
			return HttpResponse.ok(list);
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = ReturnListController;
