const CreateAnnotationRequestDTO = require('./CreateAnnotationRequestDTO');
const HttpResponse = require('../../../helpers/HttpResponse');
const InvalidParamError = require('../../../helpers/errors/InvalidParamError');
// const logger = require('../../../helpers/logger');
const MissingParamError = require('../../../helpers/errors/MissingParamError');

class CreateAnnotationController {
	constructor(createAnnotationService, paramTypeValidator) {
		this.createAnnotationService = createAnnotationService;
		this.paramTypeValidator = paramTypeValidator;
	}

	async handle(httpRequest) {
		try {
			// logger.info(
			// 	`Usuário:${request.user.id} está tentando cadastrar uma anotação.`,
			// );
			const { listId } = httpRequest.params;
			const { contents } = httpRequest.body;
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
			const createAnnotationRequestDTO = new CreateAnnotationRequestDTO({
				...httpRequest.params,
				...httpRequest.body,
			});
			await this.createAnnotationService.execute(
				createAnnotationRequestDTO,
			);
			// logger.info(
			// 	`Usuário:${request.user.id} conseguiu cadastrar a anotação.`,
			// );
			// response.status(201);
			// response.end();
			return HttpResponse.okWithoutBody();
		} catch (error) {
			// logger.error(`${error.message}`);
			return HttpResponse.serverError();
			// if (!err.httpCode) err.httpCode = 500;
			// response.status(err.httpCode);
			// response.send(err.message);
		}
	}
}

module.exports = CreateAnnotationController;
