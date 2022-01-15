const InvalidParamError = require('../../../../src/helpers/errors/InvalidParamError');
const MissingParamError = require('../../../../src/helpers/errors/MissingParamError');
const ReturnAnnotationController = require('../../../../src/components/Annotation/ReturnAnnotation/ReturnAnnotationController');
const ServerError = require('../../../../src/helpers/errors/ServerError');

class ReturnAnnotationServiceDummy {
	async execute() {}
}

class ReturnAnnotationServiceFake {
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
	const returnAnnotationServiceDummy = new ReturnAnnotationServiceDummy();
	const loggerDummy = new LoggerDummy();
	const paramTypeValidatorMock = new ParamTypeValidatorMock();
	const sut = new ReturnAnnotationController(
		returnAnnotationServiceDummy,
		loggerDummy,
		paramTypeValidatorMock,
	);
	return sut;
};

describe('RETURN ANNOTATION CONTROLLER UNIT TEST', () => {
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
			params: { annotationId: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.message).toBe(new ServerError().message);
	});

	test('Should return 400 if no annotation id is provided', async () => {
		const httpRequest = {
			params: {},
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('annotation id').message,
		);
	});

	test('Should return 400 if no user id is provided', async () => {
		const httpRequest = {
			params: { annotationId: 1 },
			user: {},
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new MissingParamError('user id').message,
		);
	});

	test('Should return 400 if an invalid annotation id is provided', async () => {
		const httpRequest = {
			params: { annotationId: 1 },
			user: { id: 1 },
		};
		const sut = makeSut();
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.message).toBe(
			new InvalidParamError('annotation id').message,
		);
	});

	test('Should return 200 when valid infos are provided', async () => {
		const httpRequest = {
			params: { annotationId: '1' },
			user: { id: 1 },
		};
		const returnAnnotationServiceFake = new ReturnAnnotationServiceFake();
		const loggerDummy = new LoggerDummy();
		const paramTypeValidatorMock = new ParamTypeValidatorMock();
		const sut = new ReturnAnnotationController(
			returnAnnotationServiceFake,
			loggerDummy,
			paramTypeValidatorMock,
		);
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(200);
		expect(httpResponse.body).toEqual({ status: 'valid' });
	});
});
