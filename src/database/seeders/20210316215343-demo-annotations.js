/* eslint-disable no-unused-vars */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Annotations',
			[
				{
					listId: 1,
					contents: 'Contas do mes de Abril',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Annotations', null, {});
	},
};
