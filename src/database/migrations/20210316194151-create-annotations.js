/* eslint-disable no-unused-vars */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Annotations', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			listId: {
				allowNull: false,
				references: { model: 'Lists', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				type: Sequelize.INTEGER,
			},
			contents: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Annotations');
	},
};
