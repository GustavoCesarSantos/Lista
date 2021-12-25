const CreateAnnotationController = require('../../../../src/components/Annotation/CreateAnnotation/CreateAnnotationController');
const InvalidParamError = require('../../../../src/helpers/Errors/InvalidParamError');
const logger = require('../../../../src/helpers/logger');
const MissingParamError = require('../../../../src/helpers/Errors/MissingParamError');
const ServerError = require('../../../../src/helpers/Errors/ServerError');

class CreateAnnotationServiceSpy {
	async execute() {}
}

class ParamTypeValidatorSpy {
	isString(param) {
		return typeof param === 'string';
	}
}

const makeSut = () => {
	const createAnnotationServiceSpy = new CreateAnnotationServiceSpy();
	const paramTypeValidatorSpy = new ParamTypeValidatorSpy();
	const sut = new CreateAnnotationController(
		createAnnotationServiceSpy,
		paramTypeValidatorSpy,
	);
	return sut;
};

describe('CREATE ANNOTATION CONTROLLER UNIT TEST', () => {
	beforeEach(() => {
		jest.spyOn(logger, 'info').mockImplementation();

		jest.spyOn(logger, 'error').mockImplementation();
	});

	test('Should return 500 if no http request is provided', async () => {
		const sut = makeSut();
		const httpResponse = await sut.handle();
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 500 if no http request has no params', async () => {
		const httpRequest = {
			body: { contents: 'TESTE' },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 500 if no http request has no body', async () => {
		const httpRequest = {
			params: { listId: 1 },
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
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('contents').message,
		);
	});

	test('Should return 400 if an invalid list id is provided', async () => {
		const httpRequest = {
			params: { listId: 1 },
			body: { contents: 'TESTE' },
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
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(201);
	});
});
