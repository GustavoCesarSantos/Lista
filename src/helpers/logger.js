/* eslint-disable implicit-arrow-linebreak */

const winston = require('winston');

const myFormat = winston.format.printf(
    info =>
        `${info.timestamp} - [${info.label}] - Level: ${info.level}, Message: ${info.message}`,
);

const { combine, timestamp, label } = winston.format;

module.exports = winston.createLogger({
    level: 'silly',
    transports: [new winston.transports.Console()],
    format: combine(label({ label: 'lista-api' }), timestamp(), myFormat),
});
