require('dotenv').config()

const app = require('./src/config/server/express')
require('./src/config/databases/mysql')

app.listen(3000, () => console.info('Server on in port 3000'))
