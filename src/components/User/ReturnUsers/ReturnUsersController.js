const ReturnUsersRequestDTO = require('./ReturnUsersRequestDTO');

class ReturnUsersController {
	constructor(returnUsersService) {
		this.returnUsersService = returnUsersService;
	}

	async handler(request, response) {
		try {
			// logger.info(
			// 	`Usuário:${request.user.id} está tentando retornar todos os usuários.`,
			// );
			const returnUsersRequestDTO = new ReturnUsersRequestDTO({
				...request.query,
			});
			const users = await this.returnUsersService.execute(
				returnUsersRequestDTO,
			);
			// logger.info(
			// 	`Usuário:${request.user.id} conseguiu retornar todos os usuários.`,
			// );
			response.status(200).json(users);
		} catch (err) {
			if (!err.httpCode) err.httpCode = 500;
			// logger.error(`${err.httpCode} - ${err.message}`);
			response.status(err.httpCode).send(err.message);
		}
	}
}

module.exports = ReturnUsersController;
