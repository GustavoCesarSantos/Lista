const bcryptHelper = require('../../../helpers/bcrypt');
const ErrorHandler = require('../../../helpers/ErrorHandler');
// const tokenHelper = require('../../../helpers/token');
const User = require('../entities/User');
// const Email = require('../../../helpers/email');

class CreateUserService {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(createUserRequestDTO) {
		const user = new User(createUserRequestDTO);
		await user.isValid();
		const userExists = await this.userRepository.findMany({
			email: user.email,
		});
		if (userExists.length > 0)
			throw new ErrorHandler('Usuário já cadastrado.', 400);
		const hashedPassword = await bcryptHelper.encryptPassword(
			user.password,
		);
		user.password = hashedPassword;
		await this.userRepository.create(user);

		// const [{ id }] = await this.userRepository.findMany({
		// 	email: user.email,
		// });
		// const idToken = tokenHelper.createToken({ id });
		// user.id = idToken;
		// const verificationEmail = new Email();
		// await verificationEmail.sendEmail().catch(error => {
		// 	throw new ErrorHandler(error, 500);
		// });
	}
}

module.exports = CreateUserService;
