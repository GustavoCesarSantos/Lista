const ModifyListRequestDTO = require('./ModifyListRequestDTO');

class ModifyListController {
	constructor(modifyListService) {
		this.modifyListService = modifyListService;
	}

	async handler(request, response) {
		try {
			// logger.info(
			// 	`Usuário:${request.user.id} está tentando modificar a lista:${request.params.listId}.`,
			// );
			const modifyListRequestDTO = new ModifyListRequestDTO({
				...request.params,
				...request.body,
			});
			await this.modifyListService.execute(modifyListRequestDTO);
			// logger.info(
			// 	`Usuário:${request.user.id} conseguiu modificar a lista:${request.params.listId}.`,
			// );
			response.status(201);
			response.end();
		} catch (err) {
			if (!err.httpCode) err.httpCode = 500;
			// logger.error(`${err.httpCode} - ${err.message}`);
			response.status(err.httpCode);
			response.send(err.message);
		}
	}
}

module.exports = ModifyListController;
