const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API TUPAY Documentation',
      version: '1.0.0',
      description: 'Documentación de la API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL base del servidor
        description: 'Servidor local'
      }
    ]
  },
  apis: ['./src/routes/*.js'], // Ruta a los archivos de rutas donde están documentadas las operaciones
};

const swaggerDocs = swaggerJsdoc(options);
module.exports = swaggerDocs;
