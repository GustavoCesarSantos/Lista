class ReturnUsersRequestDTO {
	constructor(user) {
		this.id = user.userId;
		this.email = user.email;
		this.verifiedEmail = user.verifiedEmail;
	}
}

module.exports = ReturnUsersRequestDTO;
