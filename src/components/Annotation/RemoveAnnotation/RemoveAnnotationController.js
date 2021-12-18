const logger = require('../../../helpers/logger');
const RemoveAnnotationRequestDTO = require('./RemoveAnnotationRequestDTO');

class RemoveAnnotationController {
	constructor(removeAnnotationService) {
		this.removeAnnotationService = removeAnnotationService;
	}

	async handler(request, response) {
		try {
			logger.info(
				`Usuário:${request.user.id} está tentando excluir a anotação:${request.params.annotationId}.`,
			);
			const removeAnnotationRequestDTO = new RemoveAnnotationRequestDTO({
				...request.params,
			});
			await this.removeAnnotationService.execute(
				removeAnnotationRequestDTO,
			);
			logger.info(
				`Usuário:${request.user.id} conseguiu excluir a anotação:${request.params.annotationId}.`,
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

module.exports = RemoveAnnotationController;
