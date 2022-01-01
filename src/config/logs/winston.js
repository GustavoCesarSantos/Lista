const winston = require('winston');

const { combine, colorize, timestamp, label } = winston.format;

const myFormat = winston.format.printf(
	info =>
		`${info.timestamp} - [${info.label}] - Level: ${info.level}, Message: ${info.message}`,
);

module.exports = winston.createLogger({
	level: 'silly',
	transports: [new winston.transports.Console()],
	format: combine(
		colorize(),
		timestamp(),
		label({ label: 'lista-api' }),
		myFormat,
	),
});
