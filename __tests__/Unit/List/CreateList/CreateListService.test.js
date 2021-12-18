const CreateListService = require('../../../../src/components/List/CreateList/CreateListService');

describe('CREATE LIST SERVICE UNIT TEST', () => {
	test('Should create a valid list', async () => {
		const list = {
			id: 1,
			userId: 1,
			name: 'teste',
		};
		const ListRepositoryFake = jest.fn().mockImplementation(() => ({
			async create(data) {},
		}));
		const listRepositoryFake = new ListRepositoryFake();
		const createListService = new CreateListService(listRepositoryFake);
		await expect(createListService.execute(list)).resolves.not.toThrow();
	});
});
