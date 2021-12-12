const winston = require('winston');

const {
    combine, timestamp, label, printf,
} = winston.format;
const myFormat = printf(({
    level, message, label, timestamp,
}) => `${timestamp} - [${label}] - Level: ${level}, Message: ${message}`);

module.exports = winston.createLogger({
    level: 'silly',
    transports: [new winston.transports.Console()],
    format: combine(label({ label: 'lista-api' }), timestamp(), myFormat),
});
