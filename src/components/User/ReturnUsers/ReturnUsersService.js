const ReturnUsersResponseDTO = require('./ReturnUsersResponseDTO');
const User = require('../entities/User');

class ReturnUsersService {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(returnUsersRequestDTO) {
		const user = new User(returnUsersRequestDTO);
		const validQuery = await user.returnsAValidQuery();
		const usersDb = await this.userRepository.findMany(validQuery);
		return usersDb.map(userDb => new ReturnUsersResponseDTO(userDb));
	}
}

module.exports = ReturnUsersService;
