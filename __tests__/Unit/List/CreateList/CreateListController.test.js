const CreateListController = require('../../../../src/components/List/CreateList/CreateListController');
const InvalidParamError = require('../../../../src/helpers/Errors/InvalidParamError');
const MissingParamError = require('../../../../src/helpers/Errors/MissingParamError');
const ServerError = require('../../../../src/helpers/Errors/ServerError');

class CreateListServiceDummy {
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
	const createListServiceDummy = new CreateListServiceDummy();
	const loggerDummy = new LoggerDummy();
	const paramTypeValidatorMock = new ParamTypeValidatorMock();
	const sut = new CreateListController(
		createListServiceDummy,
		loggerDummy,
		paramTypeValidatorMock,
	);
	return sut;
};

describe('CREATE LIST CONTROLLER UNIT TEST', () => {
	test('Should return 500 if no http request is provided', async () => {
		const sut = makeSut();
		const httpResponse = await sut.handle();
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 500 if http request has no params', async () => {
		const httpRequest = {
			body: { name: 'TESTE' },
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
			body: { name: 'TESTE' },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 400 if no user id is provided', async () => {
		const httpRequest = {
			params: {},
			body: { name: 'TESTE' },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('user id').message,
		);
	});

	test('Should return 400 if no name is provided', async () => {
		const httpRequest = {
			params: { userId: 1 },
			body: {},
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('name').message,
		);
	});

	test('Should return 400 if no request user id is provided', async () => {
		const httpRequest = {
			params: { userId: 1 },
			body: { name: 'TESTE' },
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
			body: { name: 'TESTE' },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new InvalidParamError('user id').message,
		);
	});

	test('Should return 400 if an invalid name is provided', async () => {
		const httpRequest = {
			params: { userId: '1' },
			body: { name: 1 },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new InvalidParamError('name').message,
		);
	});

	test('Should return 201 when valid infos are provided', async () => {
		const httpRequest = {
			params: { userId: '1' },
			body: { name: 'Teste' },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(201);
	});
});
