const ReturnListRequestDTO = require('./ReturnListRequestDTO');

class ReturnListController {
	constructor(returnListService) {
		this.returnListService = returnListService;
	}

	async handler(request, response) {
		try {
			// logger.info(
			// 	`Usuário:${request.user.id} está tentando retornar a lista:${request.params.listId}.`,
			// );
			const returnListRequestDTO = new ReturnListRequestDTO({
				...request.params,
			});
			const list = await this.returnListService.execute(
				returnListRequestDTO,
			);
			// logger.info(
			// 	`Usuário:${request.user.id} conseguiu retornar a lista:${request.params.listId}.`,
			// );
			response.status(200);
			response.json(list);
		} catch (error) {
			if (!error.httpCode) error.httpCode = 500;
			// logger.error(`${error.httpCode} - ${error.message}`);
			response.status(error.httpCode);
			response.send(error.message);
		}
	}
}

module.exports = ReturnListController;
