/* eslint-disable no-unused-vars */

class IUserRepository {
	static create(user) {
		throw new Error('Método não implementado.');
	}

	static findOne(userId) {
		throw new Error('Método não implementado.');
	}

	static findMany(query) {
		throw new Error('Método não implementado.');
	}

	static modify(user) {
		throw new Error('Método não implementado.');
	}

	static remove(userId) {
		throw new Error('Método não implementado.');
	}
}

module.exports = IUserRepository;
