const CreateUserRequestDTO = require('./CreateUserRequestDTO');

class CreateUserController {
	constructor(createUserService) {
		this.createUserService = createUserService;
	}

	async handler(request, response) {
		try {
			// logger.info('Tentando criar um usuário.');
			const createUserRequestDTO = new CreateUserRequestDTO({
				...request.body,
			});
			await this.createUserService.execute(createUserRequestDTO);
			// logger.info(`Usuário:${request.body.email} criado com sucesso.`);
			response.status(201).end();
		} catch (err) {
			if (!err.httpCode) err.httpCode = 500;
			// logger.error(`${err.httpCode} - ${err.message}`);
			response.status(err.httpCode).send(err.message);
		}
	}
}

module.exports = CreateUserController;
