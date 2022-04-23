const ModifyUserService = require('../../../../src/components/User/ModifyUser/ModifyUserService');
const NotFoundError = require('../../../../src/helpers/errors/NotFoundError');

class UserRepositoryDummy {
	findOne() {
		return true;
	}

	modify() {}
}

class UserRepositoryErrorDummy {
	findOne() {
		return false;
	}
}

const makeSut = () => {
	const userRepository = new UserRepositoryDummy();
	const sut = new ModifyUserService(userRepository);
	return sut;
};

describe('MODIFY USER SERVICE UNIT TEST', () => {
	test('Should return 500 if no repository has no provided', async () => {
		const sut = new ModifyUserService();
		const user = {
			id: '1',
			email: 'success',
			password: 'TESTE',
		};
		const httpResponse = sut.execute(user);
		expect(httpResponse).rejects.toThrow();
	});

	test('Should return 404 if no user has founded', async () => {
		const userRepository = new UserRepositoryErrorDummy();
		const sut = new ModifyUserService(userRepository);
		const user = {
			id: '1',
			email: 'success',
			password: 'TESTE',
		};
		const httpResponse = await sut.execute(user);
		expect(httpResponse).toBeInstanceOf(NotFoundError);
	});

	test('Should modify a user', async () => {
		const sut = makeSut();
		const user = {
			id: '1',
			email: 'success',
			password: 'TESTE',
		};
		expect(sut.execute(user)).resolves.not.toThrow();
	});
});
