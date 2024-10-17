const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const apiKeyRoutes = require('./apiKeyRoutes');
const dailyLogRoutes = require('./dailyLogRoutes');
const swaggerRoutes = require('./swaggerRoutes');

// Conectar las rutas de usuario
router.use('/users', userRoutes);

// Conectar las rutas de API Keys
router.use(apiKeyRoutes);

// Conectar las rutas de Daily Logs
router.use(dailyLogRoutes);

// Conectar las rutas de Swagger
router.use(swaggerRoutes);

module.exports = router;
