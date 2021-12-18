const logger = require('../../../helpers/logger');
const ModifyUserRequestDTO = require('./ModifyUserRequestDTO');
const ModifyUserService = require('./ModifyUserService');

class ModifyUserController {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async handler(request, response) {
		try {
			logger.info(
				`Usuário:${request.user.id} está tentando modificar o usuário:${request.params.userId}.`,
			);
			const modifyUserRequestDTO = new ModifyUserRequestDTO({
				...request.params,
				...request.body,
			});
			const modifyUserService = new ModifyUserService(
				this.userRepository,
			);
			await modifyUserService.execute(modifyUserRequestDTO);
			logger.info(
				`Usuário:${request.user.id} conseguiu modificar o usuário:${request.params.userId}.`,
			);
			response.status(204).end();
		} catch (err) {
			if (!err.httpCode) err.httpCode = 500;
			logger.error(`${err.httpCode} - ${err.message}`);
			response.status(err.httpCode).send(err.message);
		}
	}
}

module.exports = ModifyUserController;
