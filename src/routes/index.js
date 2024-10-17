const express = require('express');
const router = express.Router();

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

// Conectar las rutas que requieren token de sesión
router.use('/users', sessionAuth, userRoutes);
router.use('/auth', sessionAuth, authRoutes);
router.use(sessionAuth, userDataRoutes); // Rutas para obtener la información del usuario
router.use(sessionAuth, apiKeyRoutes);
router.use(sessionAuth, dailyLogRoutes);
router.use(sessionAuth, globalUserTransactionRoutes);
router.use(sessionAuth, notificationRoutes);
router.use(sessionAuth, pendingReferenceRoutes);
router.use(sessionAuth, providerRoutes);
router.use(sessionAuth, transactionRoutes);
router.use(sessionAuth, fundifyRoutes);

// Conectar las rutas que requieren API Key
router.use('/payin', apiKeyAuth, payinRoutes);
router.use('/swagger', apiKeyAuth, swaggerRoutes);

module.exports = router;
