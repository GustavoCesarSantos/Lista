const ErrorHandler = require('../../../helpers/ErrorHandler');
// const tokenHelper = require('../../../helpers/token');
const User = require('../entities/User');
// const Email = require('../../../helpers/email');

class CreateUserService {
	constructor(userRepository, encryptHelper) {
		this.userRepository = userRepository;
		this.encryptHelper = encryptHelper;
	}

	async execute(createUserRequestDTO) {
		const user = new User(createUserRequestDTO);
		const userExists = await this.userRepository.findMany({
			email: user.email,
		});
		if (userExists.length > 0) {
			throw new ErrorHandler('Usuário já cadastrado.', 400);
		}
		const hashedPassword = await this.encryptHelper.encryptPassword(
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
