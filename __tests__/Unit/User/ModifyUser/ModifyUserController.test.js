const InvalidParamError = require('../../../../src/helpers/errors/InvalidParamError');
const MissingParamError = require('../../../../src/helpers/errors/MissingParamError');
const ModifyUserController = require('../../../../src/components/User/ModifyUser/ModifyUserController');
const ServerError = require('../../../../src/helpers/errors/ServerError');

class ModifyUserServiceDummy {
	async execute() {}
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
	const modifyUserServiceDummy = new ModifyUserServiceDummy();
	const loggerDummy = new LoggerDummy();
	const paramTypeValidatorMock = new ParamTypeValidatorMock();
	const sut = new ModifyUserController(
		modifyUserServiceDummy,
		loggerDummy,
		paramTypeValidatorMock,
	);
	return sut;
};

describe('MODIFY USER CONTROLLER UNIT TEST', () => {
	test('Should return 500 if no http request is provided', async () => {
		const sut = makeSut();
		const httpResponse = await sut.handle();
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 500 if http request has no params', async () => {
		const httpRequest = {
			body: { email: 'TESTE' },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 500 if http request has no body', async () => {
		const httpRequest = {
			params: { userId: 1 },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 500 if http request has no user', async () => {
		const httpRequest = {
			params: { userId: 1 },
			body: { email: 'TESTE' },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 400 if no user id is provided', async () => {
		const httpRequest = {
			params: {},
			body: { email: 'TESTE' },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('user id').message,
		);
	});

	test('Should return 400 if no e-mail is provided', async () => {
		const httpRequest = {
			params: { userId: 1 },
			body: {},
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('email').message,
		);
	});

	test('Should return 400 if no request user id is provided', async () => {
		const httpRequest = {
			params: { userId: 1 },
			body: { email: 'TESTE' },
			user: {},
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('request user id').message,
		);
	});

	test('Should return 400 if an invalid user id is provided', async () => {
		const httpRequest = {
			params: { userId: 1 },
			body: { email: 'TESTE' },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new InvalidParamError('user id').message,
		);
	});

	test('Should return 400 if an invalid email is provided', async () => {
		const httpRequest = {
			params: { userId: '1' },
			body: { email: 1 },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new InvalidParamError('email').message,
		);
	});

	test('Should return 204 when valid infos are provided', async () => {
		const httpRequest = {
			params: { userId: '1' },
			body: { email: 'TESTE' },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(204);
	});
});
