const CreateListRequestDTO = require('./CreateListRequestDTO');
const logger = require('../../../helpers/logger');

class CreateListController {
	constructor(createListService) {
		this.createListService = createListService;
	}

	async handler(request, response) {
		try {
			logger.info(
				`Usuário:${request.user.id} está tentando cadastrar uma lista.`,
			);
			const createListRequestDTO = new CreateListRequestDTO({
				...request.params,
				...request.body,
			});
			await this.createListService.execute(createListRequestDTO);
			logger.info(
				`Usuário:${request.user.id} conseguiu cadastrar a lista.`,
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

module.exports = CreateListController;
