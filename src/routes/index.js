const express = require('express');
const router = express.Router();

// Importar las rutas
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const userDataRoutes = require('./userDataRoutes');
const apiKeyRoutes = require('./apiKeyRoutes');
const dailyLogRoutes = require('./dailyLogRoutes');
const globalUserTransactionRoutes = require('./globalUserTransactionRoutes');
const notificationRoutes = require('./notificationRoutes');
const pendingReferenceRoutes = require('./pendingReferenceRoutes');
const providerRoutes = require('./providerRoutes');
const transactionRoutes = require('./transactionRoutes');
const fundifyRoutes = require('./fundifyRoutes');
const payinRoutes = require('./payinRoutes');
const swaggerRoutes = require('./swaggerRoutes');

// Importar los middlewares de autenticación
const sessionAuth = require('../middlewares/sessionAuth');
const apiKeyAuth = require('../middlewares/apiKeyAuth');

// Rutas que no requieren autenticación
router.use('/auth', authRoutes);

// Rutas que requieren token de sesión
const sessionAuthenticatedRoutes = [
    { path: '/users', route: userRoutes },
    { path: '/userData', route: userDataRoutes },
    { path: '/api-keys', route: apiKeyRoutes },
    { path: '/daily-logs', route: dailyLogRoutes },
    { path: '/global-user-transactions', route: globalUserTransactionRoutes },
    { path: '/notifications', route: notificationRoutes },
    { path: '/pending-references', route: pendingReferenceRoutes },
    { path: '/providers', route: providerRoutes },
    { path: '/transactions', route: transactionRoutes },
];

// Aplicar el middleware a todas las rutas que requieren autenticación
sessionAuthenticatedRoutes.forEach(({ path, route }) => {
    router.use(path, sessionAuth, route);
});

// Rutas que requieren API Key
router.use('/fundify', apiKeyAuth, fundifyRoutes);
router.use('/payin', apiKeyAuth, payinRoutes);

// Ruta para Swagger
router.use('/swagger', swaggerRoutes);

module.exports = router;
