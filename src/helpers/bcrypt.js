const bcrypt = require('bcrypt');

module.exports = {
	async encryptPassword(password) {
		const salt = await bcrypt.genSalt(12);
		const encryptedPassword = await bcrypt.hash(password, salt);
		return encryptedPassword;
	},

	async comparePassword(password, encryptedPassword) {
		const samePassword = await bcrypt.compare(password, encryptedPassword);
		return samePassword;
	},
};
