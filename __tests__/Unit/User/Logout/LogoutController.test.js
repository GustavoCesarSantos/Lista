const Logout = require('../../../../src/components/User/Logout/LogoutController');
const MissingParamError = require('../../../../src/helpers/errors/MissingParamError');
const ServerError = require('../../../../src/helpers/errors/ServerError');

class LogoutServiceDummy {
	async execute() {
		return { accessToken: '', refreshToken: '' };
	}
}

class LoggerDummy {
	info(message) {
		return message;
	}
	error(message) {
		return message;
	}
}

class ParamTypeValidatorMock {
	isString(param) {
		return typeof param === 'string';
	}
}

const makeSut = () => {
	const logoutServiceDummy = new LogoutServiceDummy();
	const loggerDummy = new LoggerDummy();
	const paramTypeValidatorMock = new ParamTypeValidatorMock();
	const sut = new Logout(
		logoutServiceDummy,
		loggerDummy,
		paramTypeValidatorMock,
	);
	return sut;
};

describe('LOGOUT CONTROLLER UNIT TEST', () => {
	test('Should return 500 if no http request is provided', async () => {
		const sut = makeSut();
		const httpResponse = await sut.handle();
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 500 if http request has no user', async () => {
		const httpRequest = {};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 400 if no request user id is provided', async () => {
		const httpRequest = { user: {} };
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('request user id').message,
		);
	});

	test('Should return 400 if no access token is provided', async () => {
		const httpRequest = { user: { id: '1' } };
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('access token').message,
		);
	});

	test('Should return 204 when valid infos are provided', async () => {
		const httpRequest = { user: { id: 'success' }, token: 'success' };
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(204);
	});
});
