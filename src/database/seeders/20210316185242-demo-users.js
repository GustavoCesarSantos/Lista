'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    email: 'teste@teste.com',
                    password:
                        '$2b$12$AqanOHKGpaGkvMKT3VrL8uK9Mdz4jY5CdE5VlbznrSz3KvyUjfLD.',
                    verifiedEmail: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
