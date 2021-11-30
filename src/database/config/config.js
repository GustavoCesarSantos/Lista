require('dotenv').config()

module.exports = {
  test: {
    username: 'root',
    password: '123456',
    database: 'list-test',
    host: 'localhost',
    dialect: 'sqlite',
    timestamp: 'true',
    storage: './__tests__/database.sqlite'
  },
  development: {
    username: process.env.DATABASE_USERNAME_DEV,
    password: process.env.DATABASE_PASSWORD_DEV,
    database: process.env.DATABASE_DEV,
    host: process.env.DATABASE_HOST_DEV,
    dialect: process.env.DATABASE_DIALECT_DEV,
    timestamp: 'true'
  },
  production: {
    username: process.env.DATABASE_USERNAME_PROD,
    password: process.env.DATABASE_PASSWORD_PROD,
    database: process.env.DATABASE_PROD,
    host: process.env.DATABASE_HOST_PROD,
    dialect: process.env.DATABASE_DIALECT_PROD,
    timestamp: 'true'
  }
}
