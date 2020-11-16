const Sequelize = require('sequelize');

const config = require('../config');
const AnnotationsTable = require('../../database/table/Annotations');
const AnnotationsModel = require('../../database/models/Annotations');
const ListsModel = require('../../database/models/Lists');
const ListsTable = require('../../database/table/Lists');

const dbConnection = new Sequelize(
  config.DATABASE,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: 'mysql',
    timestamp: true,
    logging: false
  }
)

dbConnection.authenticate()
  .then(() => { 
    console.info('Mysql connected')

    //Create tables
    ListsTable(dbConnection).sync();
    AnnotationsTable(dbConnection).sync();

    //Create models
    ListsModel.init(dbConnection);
    AnnotationsModel.init(dbConnection);

    //Create associations
    ListsModel.associate(dbConnection.models);
    AnnotationsModel.associate(dbConnection.models)
  })
  .catch(err => {
    console.error(err);
  })

module.exports = dbConnection;