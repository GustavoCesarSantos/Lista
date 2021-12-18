const logger = require('../../../helpers/logger');
const RemoveListRequestDTO = require('./RemoveListRequestDTO');

class RemoveListController {
	constructor(removeListService) {
		this.removeListService = removeListService;
	}

	async handler(request, response) {
		try {
			logger.info(
				`Usuário:${request.user.id} está tentando excluir uma lista:${request.params.listId}.`,
			);
			const removeListRequestDTO = new RemoveListRequestDTO({
				...request.params,
			});
			await this.removeListService.execute(removeListRequestDTO);
			logger.info(
				`Usuário:${request.user.id} conseguiu excluir a lista:${request.params.listId}.`,
			);
			response.status(201);
			response.end();
		} catch (err) {
			if (!err.httpCode) err.httpCode = 500;
			logger.error(`${err.httpCode} - ${err.message}`);
			response.status(err.httpCode);
			response.send(err.message);
		}
	}
}

module.exports = RemoveListController;
