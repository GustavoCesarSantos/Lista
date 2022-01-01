const HttpResponse = require('../../../helpers/HttpResponse');
const InvalidParamError = require('../../../helpers/errors/InvalidParamError');
const MissingParamError = require('../../../helpers/errors/MissingParamError');
const RemoveAnnotationRequestDTO = require('./RemoveAnnotationRequestDTO');

class RemoveAnnotationController {
	constructor(removeAnnotationService, logger, paramTypeValidator) {
		this.removeAnnotationService = removeAnnotationService;
		this.logger = logger;
		this.paramTypeValidator = paramTypeValidator;
	}

	async handle(httpRequest) {
		try {
			const { annotationId } = httpRequest.params;
			const { id } = httpRequest.user;
			if (!annotationId) {
				return HttpResponse.badRequest(
					new MissingParamError('annotation id'),
				);
			}
			if (!id) {
				return HttpResponse.badRequest(
					new MissingParamError('user id'),
				);
			}
			if (!this.paramTypeValidator.isString(annotationId)) {
				return HttpResponse.badRequest(
					new InvalidParamError('annotation id'),
				);
			}
			this.logger.info(
				`Usuário:${id} está tentando excluir a anotação:${annotationId}.`,
			);
			const removeAnnotationRequestDTO = new RemoveAnnotationRequestDTO({
				...httpRequest.params,
			});
			await this.removeAnnotationService.execute(
				removeAnnotationRequestDTO,
			);
			this.logger.info(
				`Usuário:${id} conseguiu excluir a anotação:${annotationId}.`,
			);
			return HttpResponse.okWithoutBody();
		} catch (err) {
			this.logger.error(`${err.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = RemoveAnnotationController;
