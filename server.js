require('dotenv').config()

const logger = require('./src/helpers/logger')

const app = require('./src/config/server/express')
require('./src/config/databases/allowlist-refresh-token')
require('./src/config/databases/blocklist-access-token')

app.listen(3000, logger.info('Server on in port 3000'))
