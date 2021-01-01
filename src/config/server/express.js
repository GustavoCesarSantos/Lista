const express = require('express')
const helmet = require('helmet')

const routesUser = require('../../routes/User')
const routesList = require('../../routes/List')
const routesAnnotation = require('../../routes/Annotation')

const app = express()
app.use(express.json())

app.use(helmet())

// Import strategys
require('../../strategys/verifyUser')
require('../../strategys/verifyToken')

routesUser(app)
routesList(app)
routesAnnotation(app)

module.exports = app
