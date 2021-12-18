const logger = require('../../../helpers/logger');
const ReturnListsRequestDTO = require('./ReturnListsRequestDTO');

class ReturnListsController {
	constructor(returnListsService) {
		this.returnListsService = returnListsService;
	}

	async handler(request, response) {
		try {
			logger.info(
				`Usuário:${request.user.id} está tentando retornar todas as listas.`,
			);
			const returnListsRequestDTO = new ReturnListsRequestDTO({
				...request.query,
			});
			const lists = await this.returnListsService.execute(
				returnListsRequestDTO,
			);
			logger.info(
				`Usuário:${request.user.id} conseguiu retornar todas as listas.`,
			);
			response.status(200);
			response.json(lists);
		} catch (error) {
			if (!error.httpCode) error.httpCode = 500;
			logger.error(`${error.httpCode} - ${error.message}`);
			response.status(error.httpCode);
			response.send(error.message);
		}
	}
}

module.exports = ReturnListsController;
