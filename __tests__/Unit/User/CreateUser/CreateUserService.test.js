const CreateUserService = require('../../../../src/components/User/CreateUser/CreateUserService');

class UserRepositoryStub {
	findMany(query) {
		if (query.email === 'success') return [];
		if (query.email === 'fail') return ['FAIL'];
	}
	create(user) {
		user;
	}
}

class EncryptHelperFakie {
	encryptPassword(password) {
		return password;
	}
}

const makeSut = () => {
	const userRepositoryStub = new UserRepositoryStub();
	const encryptHelperFakie = new EncryptHelperFakie();
	const sut = new CreateUserService(userRepositoryStub, encryptHelperFakie);
	return sut;
};

describe('CREATE USER SERVICE UNIT TEST', () => {
	test('Should return 500 if no repository has no provided', async () => {
		const sut = new CreateUserService();
		const user = {
			email: 'success',
			password: 'TESTE',
		};
		expect(sut.execute(user)).rejects.toThrow();
	});

	test('Should return 400 if user already exist', async () => {
		const sut = makeSut();
		const user = {
			email: 'fail',
			password: 'TESTE',
		};
		expect(sut.execute(user)).rejects.toThrow();
	});

	test('Should create a valid list', async () => {
		const sut = makeSut();
		const user = {
			email: 'success',
			password: 'TESTE',
		};
		expect(sut.execute(user)).resolves.not.toThrow();
	});
});
