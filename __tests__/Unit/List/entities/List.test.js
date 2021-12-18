const List = require('../../../../src/components/List/entities/List');

describe('ENTITY LIST UNIT TEST', () => {
	test('Should not create a list object when passed a integer value in contents property', () => {
		const data = {
			userId: 1,
			name: 1,
		};
		const list = new List(data);
		list.isValid().catch(error =>
			expect(error.message).toBe('"name" must be a string'),
		);
	});

	test('Should not create a query', () => {
		const data = {};
		const list = new List(data);
		expect(list.returnsAValidQuery()).resolves.toEqual({});
	});

	test('Should create a valid list object', () => {
		const data = {
			listId: 1,
			userId: 1,
			name: 'asdf',
		};
		const list = new List(data);
		expect(list).toEqual({ id: 1, userId: 1, name: 'asdf' });
	});

	test('Should create a valid query', () => {
		const data = { name: 'teste' };
		const list = new List(data);
		expect(list.returnsAValidQuery()).resolves.toEqual(data);
	});
});
