const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Usuarios',
            version: '1.0.0',
            description: 'API para gestionar usuarios',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'], // Ruta a tus archivos de rutas
};

// Exportar la configuración para ser usada en otro archivo
const swaggerDocs = swaggerJsdoc(swaggerOptions);
module.exports = swaggerDocs;
