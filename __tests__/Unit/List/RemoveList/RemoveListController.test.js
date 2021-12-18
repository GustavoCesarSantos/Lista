const logger = require('../../../../src/helpers/logger');
const RemoveListController = require('../../../../src/components/List/RemoveList/RemoveListController');

describe('REMOVE LIST CONTROLLER UNIT TEST', () => {
	beforeEach(() => {
		jest.spyOn(logger, 'info').mockImplementation();

		jest.spyOn(logger, 'error').mockImplementation();
	});

	test('Should catch an error with default http status code', async () => {
		const request = {
			user: { id: 1 },
			params: { userId: 1 },
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			send(message) {
				return message;
			},
		};
		const RemoveListServiceFake = jest.fn().mockImplementation(() => ({
			async execute(data) {
				throw new Error('Teste');
			},
		}));
		const spy = jest.spyOn(response, 'status');
		const removeListServiceFake = new RemoveListServiceFake();
		const removeListController = new RemoveListController(
			removeListServiceFake,
		);
		await removeListController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(500);
	});

	test('Should catch an error with custom http status code', async () => {
		const request = {
			user: { id: 1 },
			params: { userId: 1 },
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			send(message) {
				return message;
			},
		};
		const RemoveListServiceFake = jest.fn().mockImplementation(() => ({
			async execute(data) {
				const error = new Error('Teste');
				error.httpCode = 401;
				throw error;
			},
		}));
		const spy = jest.spyOn(response, 'status');
		const removeListServiceFake = new RemoveListServiceFake();
		const removeListController = new RemoveListController(
			removeListServiceFake,
		);
		await removeListController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(401);
	});

	test('Should pass', async () => {
		const request = {
			user: { id: 1 },
			params: { userId: 1 },
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			end() {},
		};
		const spy = jest.spyOn(response, 'status');
		const RemoveListServiceFake = jest.fn().mockImplementation(() => ({
			execute: data => {},
		}));
		const removeListServiceFake = new RemoveListServiceFake();
		const removeListController = new RemoveListController(
			removeListServiceFake,
		);
		await removeListController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(201);
	});
});
