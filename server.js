/*global process*/

require('dotenv').config();

const WinstonLog = require('./src/helpers/logs/WinstonLog');

const app = require('./src/config/server/express');
require('./src/config/databases/allowlist-refresh-token');
require('./src/config/databases/blocklist-access-token');

const port = process.env.PORT || 3000;

const server = app.listen(port, WinstonLog.info(`Server on in port ${port}.`));

process.on('uncaughtException', (err, origin) => {
	WinstonLog.error(`uncaughtException' - ${err.message}`);
	WinstonLog.error(`uncaughtExceptionOrigin' - ${origin}`);
	process.exit(1);
});

process.on('SIGTERM', () => {
	WinstonLog.error('SIGTERM signal received.');
	WinstonLog.info('Closing http server.');
	server.close(() => WinstonLog.info('Http server closed.'));
});
