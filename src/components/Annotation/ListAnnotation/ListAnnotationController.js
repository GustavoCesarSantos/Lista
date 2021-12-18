const ListAnnotationRequestDTO = require('./ListAnnotationRequestDTO');
const logger = require('../../../helpers/logger');

class ListAnnotationController {
	constructor(listAnnotationService) {
		this.listAnnotationService = listAnnotationService;
	}

	async handler(request, response) {
		try {
			logger.info(
				`Usuário:${request.user.id} está tentando retornar a anotação:${request.params.annotationId}.`,
			);
			const listAnnotationRequestDTO = new ListAnnotationRequestDTO({
				...request.params,
			});
			const annotation = await this.listAnnotationService.execute(
				listAnnotationRequestDTO,
			);
			logger.info(
				`Usuário:${request.user.id} conseguiu retornar a anotação:${request.params.annotationId}.`,
			);
			response.status(200);
			response.json(annotation);
		} catch (error) {
			if (!error.httpCode) error.httpCode = 500;
			logger.error(`${error.httpCode} - ${error.message}`);
			response.status(error.httpCode);
			response.send(error.message);
		}
	}
}

module.exports = ListAnnotationController;
