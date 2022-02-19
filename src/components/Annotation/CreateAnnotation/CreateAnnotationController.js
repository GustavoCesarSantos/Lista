const CreateAnnotationRequestDTO = require('./CreateAnnotationRequestDTO');
const HttpResponse = require('../../../helpers/HttpResponse');
const InvalidParamError = require('../../../helpers/errors/InvalidParamError');
const MissingParamError = require('../../../helpers/errors/MissingParamError');

class CreateAnnotationController {
	constructor(createAnnotationService, logger, paramTypeValidator) {
		this.createAnnotationService = createAnnotationService;
		this.logger = logger;
		this.paramTypeValidator = paramTypeValidator;
	}

	async handle(httpRequest) {
		try {
			const { listId } = httpRequest.params;
			const { contents } = httpRequest.body;
			const { id } = httpRequest.user;
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
				`Usuário:${id} está tentando cadastrar uma anotação.`,
			);
			const createAnnotationRequestDTO = new CreateAnnotationRequestDTO({
				...httpRequest.params,
				...httpRequest.body,
			});
			await this.createAnnotationService.execute(
				createAnnotationRequestDTO,
			);
			this.logger.info(`Usuário:${id} conseguiu cadastrar a anotação.`);
			return HttpResponse.created();
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = CreateAnnotationController;
