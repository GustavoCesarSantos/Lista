const CreateListService = require('../../../../src/components/List/CreateList/CreateListService');

class ListRepositoryDummy {
	create() {}
}

const makeSut = () => {
	const listRepositoryDummy = new ListRepositoryDummy();
	const sut = new CreateListService(listRepositoryDummy);
	return sut;
};

describe('CREATE LIST SERVICE UNIT TEST', () => {
	test('Should return 500 if no repository has no provided', async () => {
		const sut = new CreateListService();
		const list = {
			id: 1,
			userId: 1,
			name: 'teste',
		};
		const httpResponse = sut.execute(list);
		expect(httpResponse).rejects.toThrow();
	});

	test('Should create a valid list', async () => {
		const sut = makeSut();
		const list = {
			id: 1,
			userId: 1,
			name: 'teste',
		};
		expect(sut.execute(list)).resolves.not.toThrow();
	});
});
