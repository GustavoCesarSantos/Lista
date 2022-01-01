const ModifyListController = require('../../../../src/components/List/ModifyList/ModifyListController');

describe('MODIFY LIST CONTROLLER UNIT TEST', () => {
	test('Should catch an error with default http status code', async () => {
		const request = {
			user: { id: 1 },
			params: {},
			body: {},
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			send(message) {
				return message;
			},
		};
		const ModifyListServiceFake = jest.fn().mockImplementation(() => ({
			async execute(data) {
				data;
				throw new Error('Teste');
			},
		}));
		const spy = jest.spyOn(response, 'status');
		const modifyListServiceFake = new ModifyListServiceFake();
		const modifyListController = new ModifyListController(
			modifyListServiceFake,
		);
		await modifyListController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(500);
	});

	test('Should catch an error with custom http status code', async () => {
		const request = {
			user: { id: 1 },
			params: {},
			body: {},
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			send(message) {
				return message;
			},
		};
		const ModifyListServiceFake = jest.fn().mockImplementation(() => ({
			async execute(data) {
				data;
				const error = new Error('Teste');
				error.httpCode = 404;
				throw error;
			},
		}));
		const spy = jest.spyOn(response, 'status');
		const modifyListServiceFake = new ModifyListServiceFake();
		const modifyListController = new ModifyListController(
			modifyListServiceFake,
		);
		await modifyListController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(404);
	});

	test('Should pass with http status code 201', async () => {
		const request = {
			user: { id: 1 },
			params: {},
			body: {},
		};
		const response = {
			status(statusCode) {
				return statusCode;
			},
			end() {},
		};
		const spy = jest.spyOn(response, 'status');
		const ModifyListServiceFake = jest.fn().mockImplementation(() => ({
			execute: data => {
				data;
			},
		}));
		const modifyListServiceFake = new ModifyListServiceFake();
		const modifyListController = new ModifyListController(
			modifyListServiceFake,
		);
		await modifyListController.handler(request, response);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(201);
	});
});
