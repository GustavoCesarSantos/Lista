const ReturnListsService = require('../../../../src/components/List/ReturnLists/ReturnListsService');

class ListRepositoryFake {
	findMany(listId) {
		listId;
		return true;
	}
}

const makeSut = () => {
	const listRepositoryFake = new ListRepositoryFake();
	const sut = new ReturnListsService(listRepositoryFake);
	return sut;
};

describe('RETURN LIST SERVICE UNIT TEST', () => {
	test('Should return 500 if no repository has no provided', async () => {
		const sut = new ReturnListsService();
		const lists = {
			id: 1,
		};
		const httpResponse = sut.execute(lists);
		expect(httpResponse).rejects.toThrow();
	});

	test('Should return a valid lists', async () => {
		const sut = makeSut();
		const list = {
			listId: 1,
		};
		expect(sut.execute(list)).resolves.not.toThrow();
	});
});
