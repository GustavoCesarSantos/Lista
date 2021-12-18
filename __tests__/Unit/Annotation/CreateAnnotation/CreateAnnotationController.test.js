const CreateAnnotationController = require('../../../../src/components/Annotation/CreateAnnotation/CreateAnnotationController');
const logger = require('../../../../src/helpers/logger');

describe('CREATE ANNOTATION CONTROLLER UNIT TEST', () => {
	beforeEach(() => {
		jest.spyOn(logger, 'info').mockImplementation();

		jest.spyOn(logger, 'error').mockImplementation();
	});

	test('Should catch an error with default http status code', async () => {
		const request = {
			user: { id: 1 },
			params: { listId: 1 },
			body: { contents: 'text' },
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			send(message) {
				return message;
			},
		};
		const CreateAnnotationServiceFake = jest
			.fn()
			.mockImplementation(() => ({
				async execute(data) {
					throw new Error('Teste');
				},
			}));
		const spy = jest.spyOn(response, 'status');
		const createAnnotationServiceFake = new CreateAnnotationServiceFake();
		const createAnnotationController = new CreateAnnotationController(
			createAnnotationServiceFake,
		);
		await createAnnotationController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(500);
	});

	test('Should catch an error with custom http status code', async () => {
		const request = {
			user: { id: 1 },
			params: { listId: 1 },
			body: { contents: 'text' },
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			send(message) {
				return message;
			},
		};
		const CreateAnnotationServiceFake = jest
			.fn()
			.mockImplementation(() => ({
				async execute(data) {
					const error = new Error('Teste');
					error.httpCode = 401;
					throw error;
				},
			}));
		const spy = jest.spyOn(response, 'status');
		const createAnnotationServiceFake = new CreateAnnotationServiceFake();
		const createAnnotationController = new CreateAnnotationController(
			createAnnotationServiceFake,
		);
		await createAnnotationController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(401);
	});

	test('Should pass', async () => {
		const request = {
			user: { id: 1 },
			params: { listId: 1 },
			body: { contents: 'text' },
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			end() {},
		};
		const spy = jest.spyOn(response, 'status');
		const CreateAnnotationServiceFake = jest
			.fn()
			.mockImplementation(() => ({
				execute: data => true,
			}));
		const createAnnotationServiceFake = new CreateAnnotationServiceFake();
		const createAnnotationController = new CreateAnnotationController(
			createAnnotationServiceFake,
		);
		await createAnnotationController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(201);
	});
});
