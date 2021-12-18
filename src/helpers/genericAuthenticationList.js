const { promisify } = require('util');

module.exports = authenticationList => {
	const delAsync = promisify(authenticationList.del).bind(authenticationList);
	const existsAsync = promisify(authenticationList.exists).bind(
		authenticationList,
	);
	const getAsync = promisify(authenticationList.get).bind(authenticationList);
	const setAsync = promisify(authenticationList.set).bind(authenticationList);

	return {
		async deleteToken(key) {
			await delAsync(key);
		},

		async returnPayload(key) {
			const payload = await getAsync(key);
			return payload;
		},

		async setToken(key, value, expirationDate) {
			await setAsync(key, value);
			authenticationList.expireat(key, expirationDate);
		},

		async verifyIfExistsToken(key) {
			const result = await existsAsync(key);
			return result === 1;
		},
	};
};
