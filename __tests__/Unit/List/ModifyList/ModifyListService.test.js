const ModifyListService = require('../../../../src/components/List/ModifyList/ModifyListService');
const NotFoundError = require('../../../../src/helpers/errors/NotFoundError');

class ListRepositoryDummy {
	findOne() {
		return true;
	}

	modify() {}
}

class ListRepositoryErrorDummy {
	findOne() {
		return false;
	}
}

const makeSut = () => {
	const listRepository = new ListRepositoryDummy();
	const sut = new ModifyListService(listRepository);
	return sut;
};

describe('MODIFY LIST SERVICE UNIT TEST', () => {
	test('Should return 500 if no repository has no provided', async () => {
		const sut = new ModifyListService();
		const list = {
			listId: 1,
			userId: 1,
			name: 'teste',
		};
		const httpResponse = sut.execute(list);
		expect(httpResponse).rejects.toThrow();
	});

	test('Should return 404 if no list has founded', async () => {
		const listRepository = new ListRepositoryErrorDummy();
		const sut = new ModifyListService(listRepository);
		const list = {
			listId: 1,
			userId: 1,
			name: 'teste',
		};
		const httpResponse = await sut.execute(list);
		expect(httpResponse).toBeInstanceOf(NotFoundError);
	});

	test('Should modify a list', async () => {
		const sut = makeSut();
		const list = {
			listId: 1,
			userId: 1,
			name: 'teste',
		};
		expect(sut.execute(list)).resolves.not.toThrow();
	});
});
