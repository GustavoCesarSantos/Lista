const ReturnListsService = require('../../../../src/components/List/ReturnLists/ReturnListsService');

describe('RETURN LISTS SERVICE UNIT TEST', () => {
	test('Should return a valid lists with out throw an erro', async () => {
		const list = {};
		const ListRepositoryFake = jest.fn().mockImplementation(() => ({
			async findMany(data) {},
		}));
		const listRepositoryFake = new ListRepositoryFake();
		const returnListsService = new ReturnListsService(listRepositoryFake);
		await expect(returnListsService.execute(list)).resolves.not.toThrow();
	});
});
