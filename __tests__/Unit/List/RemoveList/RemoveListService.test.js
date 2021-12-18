const RemoveListService = require('../../../../src/components/List/RemoveList/RemoveListService');

describe('REMOVE LIST SERVICE UNIT TEST', () => {
	test('Should throw  an error when not found an list', async () => {
		const list = { id: 1 };
		const ListRepositoryFake = jest.fn().mockImplementation(() => ({
			async findOne(data) {
				return false;
			},
		}));
		const listRepositoryFake = new ListRepositoryFake();
		const removeListService = new RemoveListService(listRepositoryFake);
		await removeListService
			.execute(list)
			.catch(error => expect(error.message).toBe('Lista não encontrada'));
	});

	test('Should remove a list', async () => {
		const list = { id: 1 };
		const ListRepositoryFake = jest.fn().mockImplementation(() => ({
			async findOne(data) {
				return true;
			},
			async remove(data) {},
		}));
		const listRepositoryFake = new ListRepositoryFake();
		const removeListService = new RemoveListService(listRepositoryFake);
		await expect(removeListService.execute(list)).resolves.not.toThrow();
	});
});
