const ModifyListService = require('../../../../src/components/List/ModifyList/ModifyListService');

describe('MODIFY LIST SERVICE UNIT TEST', () => {
	test('Should throw  an error when not found an list', async () => {
		const list = { id: 1 };
		const ListRepositoryFake = jest.fn().mockImplementation(() => ({
			async findOne(data) {
				return false;
			},
		}));
		const listRepositoryFake = new ListRepositoryFake();
		const modifyListService = new ModifyListService(listRepositoryFake);
		await modifyListService
			.execute(list)
			.catch(error => expect(error.message).toBe('Lista não encontrada'));
	});

	test('Should modify an list', async () => {
		const list = { id: 1 };
		const ListRepositoryFake = jest.fn().mockImplementation(() => ({
			async findOne(data) {
				return true;
			},
			async modify(data) {},
		}));
		const listRepositoryFake = new ListRepositoryFake();
		const modifyListService = new ModifyListService(listRepositoryFake);
		await expect(modifyListService.execute(list)).resolves.not.toThrow();
	});
});
