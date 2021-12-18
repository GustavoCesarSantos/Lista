const ErrorHandler = require('../../../helpers/ErrorHandler');
const User = require('../entities/User');

class ModifyUserService {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(modifyUserRequestDTO) {
		const user = new User(modifyUserRequestDTO);
		const validUser = await user.returnsAValidQuery();
		const userExists = await this.userRepository.findOne(validUser.id);
		if (!userExists) throw new ErrorHandler('Usuário não encontrado', 404);
		await this.userRepository.modify(validUser);
	}
}

module.exports = ModifyUserService;
