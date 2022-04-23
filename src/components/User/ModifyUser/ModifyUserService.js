const NotFoundError = require('../../../helpers/errors/NotFoundError');
const User = require('../entities/User');

class ModifyUserService {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(modifyUserRequestDTO) {
		const user = new User(modifyUserRequestDTO);
		const userExists = await this.userRepository.findOne(user.id);
		if (!userExists) return new NotFoundError('Usuário não encontrado');
		await this.userRepository.modify(user);
	}
}

module.exports = ModifyUserService;
