const HttpResponse = require('../../../helpers/HttpResponse');
const MissingParamError = require('../../../helpers/errors/MissingParamError');
const ReturnListsRequestDTO = require('./ReturnListsRequestDTO');

class ReturnListsController {
	constructor(returnListsService, logger) {
		this.returnListsService = returnListsService;
		this.logger = logger;
	}

	async handle(httpRequest) {
		try {
			const { id } = httpRequest.user;
			if (!id) {
				return HttpResponse.badRequest(
					new MissingParamError('user id'),
				);
			}
			this.logger.info(
				`Usuário:${id} está tentando retornar todas as listas.`,
			);
			const returnListsRequestDTO = new ReturnListsRequestDTO({
				...httpRequest.query,
			});
			const lists = await this.returnListsService.execute(
				returnListsRequestDTO,
			);
			this.logger.info(
				`Usuário:${id} conseguiu retornar todas as listas.`,
			);
			return HttpResponse.ok(lists);
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = ReturnListsController;
