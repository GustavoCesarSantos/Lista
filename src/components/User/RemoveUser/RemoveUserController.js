const RemoveUserRequestDTO = require('./RemoveUserRequestDTO');
const RemoveUserService = require('./RemoveUserService');

class RemoveUserController {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async handler(request, response) {
		try {
			// logger.info(
			// 	`Usuário:${request.user.id} está tentando remover o usuário:${request.params.userId}.`,
			// );
			const removeUserRequestDTO = new RemoveUserRequestDTO({
				...request.params,
			});
			const removeUserService = new RemoveUserService(
				this.userRepository,
			);
			await removeUserService.execute(removeUserRequestDTO);
			// logger.info(
			// 	`Usuário:${request.user.id} conseguiu remover o usuário:${request.params.userId}.`,
			// );
			response.status(204).end();
		} catch (err) {
			if (!err.httpCode) err.httpCode = 500;
			// logger.error(`${err.httpCode} - ${err.message}`);
			response.status(err.httpCode).send(err.message);
		}
	}
}

module.exports = RemoveUserController;
