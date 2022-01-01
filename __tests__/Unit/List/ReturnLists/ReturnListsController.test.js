const ReturnListsController = require('../../../../src/components/List/ReturnLists/ReturnListsController');

describe('RETURN LISTS CONTROLLER UNIT TEST', () => {
	test('Should catch an error with default http status code', async () => {
		const request = {
			user: { id: 1 },
			query: {},
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			send(message) {
				return message;
			},
		};
		const ReturnListsServiceFake = jest.fn().mockImplementation(() => ({
			async execute(data) {
				data;
				throw new Error('Teste');
			},
		}));
		const spy = jest.spyOn(response, 'status');
		const returnListsServiceFake = new ReturnListsServiceFake();
		const returnListsController = new ReturnListsController(
			returnListsServiceFake,
		);
		await returnListsController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(500);
	});

	test('Should catch an error with custom http status code', async () => {
		const request = {
			user: { id: 1 },
			query: {},
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			send(message) {
				return message;
			},
		};
		const ReturnListsServiceFake = jest.fn().mockImplementation(() => ({
			async execute(data) {
				data;
				const error = new Error('Teste');
				error.httpCode = 404;
				throw error;
			},
		}));
		const spy = jest.spyOn(response, 'status');
		const returnListsServiceFake = new ReturnListsServiceFake();
		const returnListsController = new ReturnListsController(
			returnListsServiceFake,
		);
		await returnListsController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(404);
	});

	test('Should pass with http status code 200', async () => {
		const request = {
			user: { id: 1 },
			query: {},
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
		const ReturnListsServiceFake = jest.fn().mockImplementation(() => ({
			execute: data => data,
		}));
		const returnListsServiceFake = new ReturnListsServiceFake();
		const returnListsController = new ReturnListsController(
			returnListsServiceFake,
		);
		await returnListsController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(200);
	});

	test('Should return a valid content', async () => {
		const request = {
			user: { id: 1 },
			query: {},
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
		const ReturnListsServiceFake = jest.fn().mockImplementation(() => ({
			execute: data => {
				data;
				return { name: 'Teste' };
			},
		}));
		const returnListsServiceFake = new ReturnListsServiceFake();
		const returnListsController = new ReturnListsController(
			returnListsServiceFake,
		);
		await returnListsController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith({ name: 'Teste' });
	});
});
