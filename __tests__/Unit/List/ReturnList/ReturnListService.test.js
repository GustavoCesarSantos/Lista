const ReturnListService = require('../../../../src/components/List/ReturnList/ReturnListService');

describe('RETURN LIST SERVICE UNIT TEST', () => {
	test('Should throw  an error when not found a list', async () => {
		const list = {
			id: 1,
			userId: 1,
			name: 'Teste',
		};
		const ListRepositoryFake = jest.fn().mockImplementation(() => ({
			async findOne(data) {
				return false;
			},
		}));
		const listRepositoryFake = new ListRepositoryFake();
		const returnListService = new ReturnListService(listRepositoryFake);
		await returnListService
			.execute(list)
			.catch(error => expect(error.message).toBe('Lista não encontrada'));
	});

	test('Should return an list', async () => {
		const list = {
			id: 1,
			userId: 1,
			name: 'Teste',
		};
		const listResponseDTO = {
			id: 1,
			name: 'Teste',
		};
		const ListRepositoryFake = jest.fn().mockImplementation(() => ({
			async findOne(data) {
				return list;
			},
		}));
		const listRepositoryFake = new ListRepositoryFake();
		const returnListService = new ReturnListService(listRepositoryFake);
		const response = await returnListService.execute(list);
		expect(response).toEqual(listResponseDTO);
	});
});
