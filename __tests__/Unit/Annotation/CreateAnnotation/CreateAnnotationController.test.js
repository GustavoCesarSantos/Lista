const CreateAnnotationController = require('../../../../src/components/Annotation/CreateAnnotation/CreateAnnotationController');
const InvalidParamError = require('../../../../src/helpers/errors/InvalidParamError');
const MissingParamError = require('../../../../src/helpers/errors/MissingParamError');
const ServerError = require('../../../../src/helpers/errors/ServerError');

class CreateAnnotationServiceDummy {
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
	const createAnnotationServiceDummy = new CreateAnnotationServiceDummy();
	const loggerDummy = new LoggerDummy();
	const paramTypeValidatorMock = new ParamTypeValidatorMock();
	const sut = new CreateAnnotationController(
		createAnnotationServiceDummy,
		loggerDummy,
		paramTypeValidatorMock,
	);
	return sut;
};

describe('CREATE ANNOTATION CONTROLLER UNIT TEST', () => {
	test('Should return 500 if no http request is provided', async () => {
		const sut = makeSut();
		const httpResponse = await sut.handle();
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 500 if http request has no params', async () => {
		const httpRequest = {
			body: { contents: 'TESTE' },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 500 if http request has no body', async () => {
		const httpRequest = {
			params: { listId: 1 },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 500 if http request has no user', async () => {
		const httpRequest = {
			params: { listId: 1 },
			body: { contents: 'TESTE' },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 400 if no list id is provided', async () => {
		const httpRequest = {
			params: {},
			body: { contents: 'TESTE' },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('list id').message,
		);
	});

	test('Should return 400 if no contents is provided', async () => {
		const httpRequest = {
			params: { listId: 1 },
			body: {},
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('contents').message,
		);
	});

	test('Should return 400 if no user id is provided', async () => {
		const httpRequest = {
			params: { listId: 1 },
			body: { contents: 'TESTE' },
			user: {},
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('user id').message,
		);
	});

	test('Should return 400 if an invalid list id is provided', async () => {
		const httpRequest = {
			params: { listId: 1 },
			body: { contents: 'TESTE' },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new InvalidParamError('list id').message,
		);
	});

	test('Should return 400 if an invalid content is provided', async () => {
		const httpRequest = {
			params: { listId: '1' },
			body: { contents: 1 },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new InvalidParamError('contents').message,
		);
	});

	test('Should return 201 when valid infos are provided', async () => {
		const httpRequest = {
			params: { listId: '1' },
			body: { contents: 'Teste' },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(201);
	});
});
