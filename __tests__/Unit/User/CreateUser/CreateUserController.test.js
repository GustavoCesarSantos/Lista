const CreateUserController = require('../../../../src/components/User/CreateUser/CreateUserController');
const InvalidParamError = require('../../../../src/helpers/errors/InvalidParamError');
const MissingParamError = require('../../../../src/helpers/errors/MissingParamError');
const ServerError = require('../../../../src/helpers/errors/ServerError');

class CreateUserServiceDummy {
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
	const createUserServiceDummy = new CreateUserServiceDummy();
	const loggerDummy = new LoggerDummy();
	const paramTypeValidatorMock = new ParamTypeValidatorMock();
	const sut = new CreateUserController(
		createUserServiceDummy,
		loggerDummy,
		paramTypeValidatorMock,
	);
	return sut;
};

describe('CREATE USER CONTROLLER UNIT TEST', () => {
	test('Should return 500 if no http request is provided', async () => {
		const sut = makeSut();
		const httpResponse = await sut.handle();
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 500 if http request has no body', async () => {
		const httpRequest = {};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 400 if no email is provided', async () => {
		const httpRequest = { body: { password: 'TESTE' } };
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('e-mail').message,
		);
	});

	test('Should return 400 if no password is provided', async () => {
		const httpRequest = { body: { email: 'TESTE' } };
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('password').message,
		);
	});

	test('Should return 400 if an invalid email is provided', async () => {
		const httpRequest = { body: { email: 1, password: 'TESTE' } };
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new InvalidParamError('e-mail').message,
		);
	});

	test('Should return 400 if an invalid password is provided', async () => {
		const httpRequest = { body: { email: 'TESTE', password: 1 } };
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new InvalidParamError('password').message,
		);
	});

	test('Should return 201 when valid infos are provided', async () => {
		const httpRequest = { body: { email: 'TESTE', password: 'TESTE' } };
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(201);
	});
});
