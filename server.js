require('dotenv').config()

const app = require('./src/config/server/express')
require('./src/config/databases/mysql')
require('./src/config/databases/allowlist-refresh-token')
require('./src/config/databases/blocklist-access-token')

app.listen(3000, () => console.info('Server on in port 3000'))
