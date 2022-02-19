const ErrorHandler = require('../../../helpers/ErrorHandler');
const User = require('../entities/User');

class VerifyEmailService {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(verifyEmailRequestDTO) {
		const user = new User(verifyEmailRequestDTO);
		const userExists = await this.userRepository.findOne(user.id);
		if (!userExists) throw new ErrorHandler('Usuário não encontrado', 404);
		await this.userRepository.modify(user);
	}
}

module.exports = VerifyEmailService;
