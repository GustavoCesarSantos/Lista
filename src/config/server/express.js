const express = require('express');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');

const routesUser = require('../../routes/User');
const routesList = require('../../routes/List');
const routesAnnotation = require('../../routes/Annotation');
const swaggerFile = require('../doc/swagger_output.json');

const app = express();
app.use(express.json());

app.use(helmet());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.get('/status', (request, response) =>
    response.status(200).json({ message: 'ok' }),
);

// Import strategys
require('../../strategys/verifyUser');
require('../../strategys/verifyToken');

routesUser(app);
routesList(app);
routesAnnotation(app);

module.exports = app;
