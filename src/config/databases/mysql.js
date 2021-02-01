const Sequelize = require('sequelize')

const config = require('../config')
const AnnotationsTable = require('../../database/table/Annotations')
const AnnotationsModel = require('../../database/models/Annotations')
const ListsModel = require('../../database/models/Lists')
const ListsTable = require('../../database/table/Lists')
const UsersModel = require('../../database/models/Users')
const UsersTable = require('../../database/table/Users')

const dbConnection = new Sequelize(
  config.DATABASE,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.DIALECT,
    storage: './__tests__/database.sqlite',
    timestamp: true,
    logging: false
  }
)

dbConnection.authenticate()
  .then(() => {
    console.info('Mysql connected')

    // Create tables
    UsersTable(dbConnection).sync()
    ListsTable(dbConnection).sync()
    AnnotationsTable(dbConnection).sync()

    // Create models
    UsersModel.init(dbConnection)
    ListsModel.init(dbConnection)
    AnnotationsModel.init(dbConnection)

    // Create associations
    UsersModel.associate(dbConnection.models)
    ListsModel.associate(dbConnection.models)
    AnnotationsModel.associate(dbConnection.models)
  })
  .catch(err => {
    console.error(err)
  })

module.exports = dbConnection
