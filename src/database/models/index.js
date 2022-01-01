/* global process, __filename, __dirname */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
const WinstonLog = require('../../helpers/logs/WinstonLog');

const db = {};

const sequelize = new Sequelize(config.url, { logging: false });

sequelize
	.authenticate()
	.then(() => {
		WinstonLog.info('Connection has been established successfully.');
	})
	.catch(err => {
		WinstonLog.error('Unable to connect to the database:', err);
	});

fs.readdirSync(__dirname)
	.filter(
		file =>
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js',
	)
	.forEach(file => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes,
		);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

process.on('SIGTERM', async () => {
	await sequelize.close();
	process.exit(0);
});

module.exports = db;
