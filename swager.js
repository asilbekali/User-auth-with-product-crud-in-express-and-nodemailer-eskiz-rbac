const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Express API',
      version: '1.0.0',
      description: 'User auth with products',
    },
  },
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};