const HttpResponse = require('../../../helpers/HttpResponse');
const InvalidParamError = require('../../../helpers/errors/InvalidParamError');
const MissingParamError = require('../../../helpers/errors/MissingParamError');
const ModifyAnnotationRequestDTO = require('./ModifyAnnotationRequestDTO');

class ModifyAnnotationController {
	constructor(modifyAnnotationService, logger, paramTypeValidator) {
		this.modifyAnnotationService = modifyAnnotationService;
		this.logger = logger;
		this.paramTypeValidator = paramTypeValidator;
	}

	async handle(httpRequest) {
		try {
			const { annotationId } = httpRequest.params;
			const { listId, contents } = httpRequest.body;
			const { id } = httpRequest.user;
			if (!annotationId) {
				return HttpResponse.badRequest(
					new MissingParamError('annotation id'),
				);
			}
			if (!listId) {
				return HttpResponse.badRequest(
					new MissingParamError('list id'),
				);
			}
			if (!contents) {
				return HttpResponse.badRequest(
					new MissingParamError('contents'),
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
			if (!this.paramTypeValidator.isString(listId)) {
				return HttpResponse.badRequest(
					new InvalidParamError('list id'),
				);
			}
			if (!this.paramTypeValidator.isString(contents)) {
				return HttpResponse.badRequest(
					new InvalidParamError('contents'),
				);
			}
			this.logger.info(
				`Usuário:${id} está tentando modificar a anotação:${annotationId}.`,
			);
			const modifyAnnotationRequestDTO = new ModifyAnnotationRequestDTO({
				...httpRequest.params,
				...httpRequest.body,
			});
			await this.modifyAnnotationService.execute(
				modifyAnnotationRequestDTO,
			);
			this.logger.info(
				`Usuário:${id} conseguiu modificar a anotação:${annotationId}.`,
			);
			return HttpResponse.okWithoutBody();
		} catch (err) {
			this.logger.error(`${err.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = ModifyAnnotationController;
