const HttpResponse = require('../../../helpers/HttpResponse');
const MissingParamError = require('../../../helpers/errors/MissingParamError');
const ReturnAnnotationsRequestDTO = require('./ReturnAnnotationsRequestDTO');

class ReturnAnnotationsController {
	constructor(listAnnotationsService, logger) {
		this.listAnnotationsService = listAnnotationsService;
		this.logger = logger;
	}

	async handle(httpRequest) {
		try {
			const { id } = httpRequest.user;
			if (!id) {
				return HttpResponse.badRequest(
					new MissingParamError('user id'),
				);
			}
			this.logger.info(
				`Usuário:${id} está tentando retornar todas as anotações.`,
			);
			const listAnnotationsRequestDTO = new ReturnAnnotationsRequestDTO({
				...httpRequest.query,
			});
			const annotations = await this.listAnnotationsService.execute(
				listAnnotationsRequestDTO,
			);
			this.logger.info(
				`Usuário:${id} conseguiu retornar todas as anotações.`,
			);
			return HttpResponse.ok(annotations);
		} catch (error) {
			this.logger.error(`${error.message}`);
			return HttpResponse.serverError();
		}
	}
}

module.exports = ReturnAnnotationsController;
