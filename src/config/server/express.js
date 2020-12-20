const express = require('express')

const routesUser = require('../../routes/User')
const routesList = require('../../routes/List')
const routesAnnotation = require('../../routes/Annotation')

const app = express()
app.use(express.json())

// Import authentication strategys
require('../../strategys/verifyUser')
require('../../strategys/verifyToken')

routesUser(app)
routesList(app)
routesAnnotation(app)

module.exports = app
