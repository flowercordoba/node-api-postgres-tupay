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
const swaggerRoutes = require('./swaggerRoutes');

// Conectar las rutas de usuario
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use(userDataRoutes); // Rutas para obtener la información del usuario



// Conectar las rutas de API Keys
router.use(apiKeyRoutes);

// Conectar las rutas de Daily Logs
router.use(dailyLogRoutes);

// Conectar las rutas de Global User Transactions
router.use(globalUserTransactionRoutes);

// Conectar las rutas de Notificaciones
router.use(notificationRoutes);

// Conectar las rutas de Pending References
router.use(pendingReferenceRoutes);

// Conectar las rutas de Proveedores
router.use(providerRoutes);

// Conectar las rutas de Transacciones
router.use(transactionRoutes);

// Conectar las rutas de Swagger
router.use(swaggerRoutes);

module.exports = router;
