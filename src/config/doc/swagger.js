const swaggerAutogen = require('swagger-autogen')({ language: 'pt-BR' })

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/User.js', './src/routes/List', './src/routes/Annotation']

swaggerAutogen(outputFile, endpointsFiles)
