require('dotenv').config();

module.exports = {
    test: {
        username: 'root',
        password: '123456',
        database: 'list-test',
        host: 'localhost',
        dialect: 'sqlite',
        timestamp: 'true',
        storage: './__tests__/database.sqlite',
    },
    development: {
        url: process.env.DEV_DATABASE_URL,
        timestamp: 'true',
    },
    production: {
        url: process.env.CLEARDB_DATABASE_URL,
        timestamp: 'true',
    },
};
