const InvalidParamError = require('../../../../src/helpers/errors/InvalidParamError');
const MissingParamError = require('../../../../src/helpers/errors/MissingParamError');
const ReturnListController = require('../../../../src/components/List/ReturnList/ReturnListController');
const ServerError = require('../../../../src/helpers/errors/ServerError');

class ReturnListServiceDummy {
	async execute() {}
}

class ReturnListServiceFake {
	async execute() {
		return {
			status: 'valid',
		};
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
	const returnListServiceDummy = new ReturnListServiceDummy();
	const loggerDummy = new LoggerDummy();
	const paramTypeValidatorMock = new ParamTypeValidatorMock();
	const sut = new ReturnListController(
		returnListServiceDummy,
		loggerDummy,
		paramTypeValidatorMock,
	);
	return sut;
};

describe('RETURN LIST CONTROLLER UNIT TEST', () => {
	test('Should return 500 if no http request is provided', async () => {
		const sut = makeSut();
		const httpResponse = await sut.handle();
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 500 if http request has no params', async () => {
		const httpRequest = {
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
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 400 if no list id is provided', async () => {
		const httpRequest = {
			params: {},
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('list id').message,
		);
	});

	test('Should return 400 if no user id is provided', async () => {
		const httpRequest = {
			params: { listId: 1 },
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
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new InvalidParamError('list id').message,
		);
	});

	test('Should return 200 when valid infos are provided', async () => {
		const httpRequest = {
			params: { listId: '1' },
			user: { id: 1 },
		};
		const returnListServiceFake = new ReturnListServiceFake();
		const loggerDummy = new LoggerDummy();
		const paramTypeValidatorMock = new ParamTypeValidatorMock();
		const sut = new ReturnListController(
			returnListServiceFake,
			loggerDummy,
			paramTypeValidatorMock,
		);
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(200);
		expect(httpResponse.body).toEqual({ status: 'valid' });
	});
});
