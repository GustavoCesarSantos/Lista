require('dotenv').config()

const logger = require('./src/helpers/logger')

const app = require('./src/config/server/express')
require('./src/config/databases/allowlist-refresh-token')
require('./src/config/databases/blocklist-access-token')

const port = process.env.PORT || 3000

app.listen(port, logger.info(`Server on in port ${port}`))
