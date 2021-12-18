const RemoveAnnotationController = require('../../../../src/components/Annotation/RemoveAnnotation/RemoveAnnotationController');
const logger = require('../../../../src/helpers/logger');

describe('REMOVE ANNOTATION CONTROLLER UNIT TEST', () => {
	beforeEach(() => {
		jest.spyOn(logger, 'info').mockImplementation();

		jest.spyOn(logger, 'error').mockImplementation();
	});

	test('Should catch an error with default http status code', async () => {
		const request = {
			user: { id: 1 },
			params: { listId: 1 },
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			send(message) {
				return message;
			},
		};
		const RemoveAnnotationServiceFake = jest
			.fn()
			.mockImplementation(() => ({
				async execute(data) {
					throw new Error('Teste');
				},
			}));
		const spy = jest.spyOn(response, 'status');
		const createAnnotationServiceFake = new RemoveAnnotationServiceFake();
		const createAnnotationController = new RemoveAnnotationController(
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
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			send(message) {
				return message;
			},
		};
		const RemoveAnnotationServiceFake = jest
			.fn()
			.mockImplementation(() => ({
				async execute(data) {
					const error = new Error('Teste');
					error.httpCode = 401;
					throw error;
				},
			}));
		const spy = jest.spyOn(response, 'status');
		const createAnnotationServiceFake = new RemoveAnnotationServiceFake();
		const createAnnotationController = new RemoveAnnotationController(
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
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			end() {},
		};
		const spy = jest.spyOn(response, 'status');
		const RemoveAnnotationServiceFake = jest
			.fn()
			.mockImplementation(() => ({
				execute: data => {},
			}));
		const createAnnotationServiceFake = new RemoveAnnotationServiceFake();
		const createAnnotationController = new RemoveAnnotationController(
			createAnnotationServiceFake,
		);
		await createAnnotationController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(201);
	});
});
