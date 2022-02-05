const MissingParamError = require('../../../../src/helpers/errors/MissingParamError');
const ReturnListsController = require('../../../../src/components/List/ReturnLists/ReturnListsController');
const ServerError = require('../../../../src/helpers/errors/ServerError');

class ReturnListsServiceDummy {
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

const makeSut = () => {
	const returnListsServiceDummy = new ReturnListsServiceDummy();
	const loggerDummy = new LoggerDummy();
	const sut = new ReturnListsController(returnListsServiceDummy, loggerDummy);
	return sut;
};

describe('RETURN LISTS CONTROLLER UNIT TEST', () => {
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

	test('Should return 400 if no user id is provided', async () => {
		const httpRequest = {
			user: {},
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('user id').message,
		);
	});

	test('Should return 200 when valid infos are provided', async () => {
		const httpRequest = {
			user: { id: 1 },
		};
		const returnListServiceFake = new ReturnListServiceFake();
		const loggerDummy = new LoggerDummy();
		const sut = new ReturnListsController(
			returnListServiceFake,
			loggerDummy,
		);
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(200);
		expect(httpResponse.body).toEqual({ status: 'valid' });
	});
});
