const ReturnUsersResponseDTO = require('./ReturnUsersResponseDTO');
const User = require('../entities/User');

class ReturnUsersService {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(returnUsersRequestDTO) {
		const user = new User(returnUsersRequestDTO);
		const usersDb = await this.userRepository.findMany(user);
		return usersDb.map(userDb => new ReturnUsersResponseDTO(userDb));
	}
}

module.exports = ReturnUsersService;
