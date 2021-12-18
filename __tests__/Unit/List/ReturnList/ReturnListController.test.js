const logger = require('../../../../src/helpers/logger');
const ReturnListController = require('../../../../src/components/List/ReturnList/ReturnListController');

describe('RETURN LIST CONTROLLER UNIT TEST', () => {
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
		const ReturnListServiceFake = jest.fn().mockImplementation(() => ({
			async execute(data) {
				throw new Error('Teste');
			},
		}));
		const spy = jest.spyOn(response, 'status');
		const returnListServiceFake = new ReturnListServiceFake();
		const returnListController = new ReturnListController(
			returnListServiceFake,
		);
		await returnListController.handler(request, response);
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
		const ReturnListServiceFake = jest.fn().mockImplementation(() => ({
			async execute(data) {
				const error = new Error('Teste');
				error.httpCode = 401;
				throw error;
			},
		}));
		const spy = jest.spyOn(response, 'status');
		const returnListServiceFake = new ReturnListServiceFake();
		const returnListController = new ReturnListController(
			returnListServiceFake,
		);
		await returnListController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(401);
	});

	test('Should pass with http status code 200', async () => {
		const request = {
			user: { id: 1 },
			params: { listId: 1 },
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			json(data) {
				return data;
			},
		};
		const spy = jest.spyOn(response, 'status');
		const ReturnListServiceFake = jest.fn().mockImplementation(() => ({
			execute: data => data,
		}));
		const returnListServiceFake = new ReturnListServiceFake();
		const returnListController = new ReturnListController(
			returnListServiceFake,
		);
		await returnListController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(200);
	});

	test('Should return a valid content', async () => {
		const request = {
			user: { id: 1 },
			params: { listId: 1 },
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			json(data) {
				return data;
			},
		};
		const spy = jest.spyOn(response, 'json');
		const ReturnListServiceFake = jest.fn().mockImplementation(() => ({
			execute: data => ({ name: 'Teste' }),
		}));
		const returnListServiceFake = new ReturnListServiceFake();
		const returnListController = new ReturnListController(
			returnListServiceFake,
		);
		await returnListController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith({ name: 'Teste' });
	});
});
