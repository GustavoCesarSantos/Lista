const ReturnAnnotationRequestDTO = require('./ReturnAnnotationRequestDTO');
const HttpResponse = require('../../../helpers/HttpResponse');
const InvalidParamError = require('../../../helpers/errors/InvalidParamError');
const MissingParamError = require('../../../helpers/errors/MissingParamError');

class ReturnAnnotationController {
	constructor(returnAnnotationService, logger, paramTypeValidator) {
		this.returnAnnotationService = returnAnnotationService;
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
				`Usuário:${id} está tentando retornar a anotação:${annotationId}.`,
			);
			const returnAnnotationRequestDTO = new ReturnAnnotationRequestDTO({
				...httpRequest.params,
			});
			const annotation = await this.returnAnnotationService.execute(
				returnAnnotationRequestDTO,
			);
			this.logger.info(
				`Usuário:${id} conseguiu retornar a anotação:${annotationId}.`,
			);
			return HttpResponse.ok(annotation);
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = ReturnAnnotationController;
