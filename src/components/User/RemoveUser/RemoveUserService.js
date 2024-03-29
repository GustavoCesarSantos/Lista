const ErrorHandler = require('../../../helpers/ErrorHandler');
const User = require('../entities/User');

class RemoveUserService {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(removeUserRequestDTO) {
		const user = new User(removeUserRequestDTO);
		const userExists = await this.userRepository.findOne(user.id);
		if (!userExists) throw new ErrorHandler('Usuário não encontrado', 404);
		await this.userRepository.remove(user.id);
	}
}

module.exports = RemoveUserService;
