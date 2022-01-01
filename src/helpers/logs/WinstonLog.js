const ILogger = require('./ILogger');
const winston = require('../../config/logs/winston');

class WinstonLog extends ILogger {
	static info(message) {
		winston.info(message);
	}

	static warn(message) {
		winston.warn(message);
	}

	static error(message) {
		winston.error(message);
	}
}

module.exports = WinstonLog;
