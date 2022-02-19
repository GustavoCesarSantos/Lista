class LogoutService {
	constructor(tokenHelper) {
		this.tokenHelper = tokenHelper;
	}

	static async execute(logoutRequestDTO) {
		await this.tokenHelper.invalidateToken(logoutRequestDTO.token);
	}
}

module.exports = LogoutService;
