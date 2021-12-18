class VerifyEmailRequestDTO {
	constructor(user) {
		this.id = user.id;
		this.verifiedEmail = user.verifiedEmail;
	}
}

module.exports = VerifyEmailRequestDTO;
