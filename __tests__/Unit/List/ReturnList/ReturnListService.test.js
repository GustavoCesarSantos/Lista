const NotFoundError = require('../../../../src/helpers/errors/NotFoundError');
const ReturnListService = require('../../../../src/components/List/ReturnList/ReturnListService');

class ListRepositoryFake {
	findOne(listId) {
		listId;
		return true;
	}
}

class ListRepositoryWithErrorFake {
	findOne(listId) {
		listId;
		return false;
	}
}

const makeSut = () => {
	const listRepositoryFake = new ListRepositoryFake();
	const sut = new ReturnListService(listRepositoryFake);
	return sut;
};

describe('RETURN LIST SERVICE UNIT TEST', () => {
	test('Should return 500 if no repository has no provided', async () => {
		const sut = new ReturnListService();
		const list = {
			id: 1,
		};
		const httpResponse = sut.execute(list);
		expect(httpResponse).rejects.toThrow();
	});

	test('Should return 404 if an list not founded', async () => {
		const listRepositoryWithErrorFake = new ListRepositoryWithErrorFake();
		const sut = new ReturnListService(listRepositoryWithErrorFake);
		const list = {
			listId: 1,
		};
		expect(sut.execute(list)).rejects.toThrow(
			new NotFoundError(`${list.listId}`),
		);
	});

	test('Should return a valid list', async () => {
		const sut = makeSut();
		const list = {
			listId: 1,
		};
		expect(sut.execute(list)).resolves.not.toThrow();
	});
});
