const express = require('express');
const router = express.Router();

// Importar las rutas de usuario
const userRoutes = require('./userRoutes');

// Importar las rutas de Swagger
const swaggerRoutes = require('./swaggerRoutes');

// Usar las rutas de usuario
router.use('/users', userRoutes);

// Usar las rutas de Swagger (documentación)
router.use(swaggerRoutes);

module.exports = router;
