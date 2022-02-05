const NotFoundError = require('../../../../src/helpers/errors/NotFoundError');
const RemoveListService = require('../../../../src/components/List/RemoveList/RemoveListService');

class ListRepositoryFake {
	findOne(listId) {
		listId;
		return true;
	}

	remove() {}
}

class ListRepositoryWithErrorFake {
	findOne(listId) {
		listId;
		return false;
	}

	remove() {}
}

const makeSut = () => {
	const listRepositoryFake = new ListRepositoryFake();
	const sut = new RemoveListService(listRepositoryFake);
	return sut;
};

describe('REMOVE LIST SERVICE UNIT TEST', () => {
	test('Should return 500 if no repository has no provided', async () => {
		const sut = new RemoveListService();
		const list = {
			listId: 1,
		};
		const httpResponse = sut.execute(list);
		expect(httpResponse).rejects.toThrow();
	});

	test('Should return 404 if an list not founded', async () => {
		const listRepositoryWithErrorFake = new ListRepositoryWithErrorFake();
		const sut = new RemoveListService(listRepositoryWithErrorFake);
		const list = {
			listId: 1,
		};
		expect(sut.execute(list)).rejects.toThrow(
			new NotFoundError(`${list.listId}`),
		);
	});

	test('Should remove an list', async () => {
		const sut = makeSut();
		const list = {
			listId: 1,
		};
		expect(sut.execute(list)).resolves.not.toThrow();
	});
});
