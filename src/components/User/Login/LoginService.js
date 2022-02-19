class LoginService {
	constructor(tokenHelper) {
		this.tokenHelper = tokenHelper;
	}

	async execute(loginRequestDTO) {
		const accessToken = this.tokenHelper.createToken(loginRequestDTO);
		const refreshToken = await this.tokenHelper.createOpaqueToken(
			loginRequestDTO,
		);
		return {
			accessToken,
			refreshToken,
		};
	}
}

module.exports = LoginService;
