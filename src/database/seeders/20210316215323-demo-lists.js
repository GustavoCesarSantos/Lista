/* eslint-disable no-unused-vars */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Lists',
            [
                {
                    userId: 1,
                    name: 'Lista Teste',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Lists', null, {});
    },
};
