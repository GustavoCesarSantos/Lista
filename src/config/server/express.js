const express = require('express');

const routesList = require('../../routes/List');
const routesAnnotation = require('../../routes/Annotation');

const app = express();
app.use(express.json());

routesList(app);
routesAnnotation(app);

module.exports = app;