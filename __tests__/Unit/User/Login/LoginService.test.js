const LoginService = require('../../../../src/components/User/Login/LoginService');

class TokenHelperDummy {
	createToken() {
		return 'success';
	}

	createOpaqueToken() {
		return 'success';
	}
}

describe('LOGIN SERVICE UNIT TEST', () => {
	test('Should return 500 if no repository has no provided', async () => {
		const sut = new LoginService();
		const user = {
			id: 'success',
		};
		expect(sut.execute(user)).rejects.toThrow();
	});

	test('Should return access and refresh token', async () => {
		const tokenHelper = new TokenHelperDummy();
		const sut = new LoginService(tokenHelper);
		const user = {
			id: 'success',
		};
		const result = await sut.execute(user);
		expect(result).toHaveProperty('accessToken');
		expect(result).toHaveProperty('refreshToken');
	});
});
