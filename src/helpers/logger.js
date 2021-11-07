const winston = require('winston')

const { combine, timestamp, label, printf } = winston.format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} - [${label}] - Level: ${level}, Message: ${message}`
})

module.exports = winston.createLogger({
  level: 'silly',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'lista-api.log' })
  ],
  format: combine(
    label({ label: 'lista-api' }),
    timestamp(),
    myFormat
  )
})
