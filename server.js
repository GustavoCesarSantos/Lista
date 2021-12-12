require('dotenv').config();

const logger = require('./src/helpers/logger');

const app = require('./src/config/server/express');
require('./src/config/databases/allowlist-refresh-token');
require('./src/config/databases/blocklist-access-token');

const port = process.env.PORT || 3000;

const server = app.listen(port, logger.info(`Server on in port ${port}`));

process.on('uncaughtException', (err, origin) => {
    logger.error('uncaughtException', err);
    logger.error('uncaughtExceptionOrigin', origin);
});

process.on('SIGTERM', () => {
    logger.error('SIGTERM signal received.');
    logger.info('Closing http server.');
    server.close(() => logger.info('Http server closed.'));
});
