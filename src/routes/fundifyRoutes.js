const express = require('express');
const router = express.Router();
const fundifyController = require('../controllers/fundifyController');

/**
 * @swagger
 * components:
 *   parameters:
 *     limitParam:
 *       in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         default: 20
 *       description: El número máximo de resultados por página
 *     offsetParam:
 *       in: query
 *       name: offset
 *       schema:
 *         type: integer
 *         default: 0
 *       description: El desplazamiento para la paginación (número de elementos a omitir)
 *
 * /api/fundify/transactions/completed:
 *   get:
 *     summary: Obtener todas las transacciones completadas con paginación
 *     tags: [Fundify]
 *     parameters:
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/offsetParam'
 *     responses:
 *       200:
 *         description: Lista de transacciones completadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Error del servidor
 */
router.get('/transactions/completed', fundifyController.getCompletedTransactions);

/**
 * @swagger
 * /api/fundify/transactions/pending:
 *   get:
 *     summary: Obtener todas las transacciones pendientes con paginación
 *     tags: [Fundify]
 *     parameters:
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/offsetParam'
 *     responses:
 *       200:
 *         description: Lista de transacciones pendientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Error del servidor
 */
router.get('/transactions/pending', fundifyController.getPendingTransactions);

/**
 * @swagger
 * /api/fundify/transactions/last-hour:
 *   get:
 *     summary: Obtener todas las transacciones de la última hora con paginación
 *     tags: [Fundify]
 *     parameters:
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/offsetParam'
 *     responses:
 *       200:
 *         description: Lista de transacciones de la última hora
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Error del servidor
 */
router.get('/transactions/last-hour', fundifyController.getTransactionsLastHour);

/**
 * @swagger
 * /api/fundify/transactions/last-24-hours:
 *   get:
 *     summary: Obtener todas las transacciones de las últimas 24 horas con paginación
 *     tags: [Fundify]
 *     parameters:
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/offsetParam'
 *     responses:
 *       200:
 *         description: Lista de transacciones de las últimas 24 horas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Error del servidor
 */
router.get('/transactions/last-24-hours', fundifyController.getTransactionsLast24Hours);

/**
 * @swagger
 * /api/fundify/transactions/last-week:
 *   get:
 *     summary: Obtener todas las transacciones de la última semana con paginación
 *     tags: [Fundify]
 *     parameters:
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/offsetParam'
 *     responses:
 *       200:
 *         description: Lista de transacciones de la última semana
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Error del servidor
 */
router.get('/transactions/last-week', fundifyController.getTransactionsLastWeek);

/**
 * @swagger
 * /api/fundify/transactions/{reference}:
 *   get:
 *     summary: Obtener una transacción por referencia
 *     tags: [Fundify]
 *     parameters:
 *       - in: path
 *         name: reference
 *         schema:
 *           type: string
 *         required: true
 *         description: Referencia única de la transacción
 *     responses:
 *       200:
 *         description: Transacción obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/transactions/:reference', fundifyController.getTransactionByReference);

/**
 * @swagger
 * /api/fundify/webhook/transaction-paid:
 *   post:
 *     summary: Webhook para notificar que una transacción fue pagada
 *     tags: [Fundify]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reference:
 *                 type: string
 *                 description: La referencia de la transacción pagada
 *     responses:
 *       200:
 *         description: Transacción actualizada correctamente
 *       500:
 *         description: Error del servidor
 */
router.post('/webhook/transaction-paid', fundifyController.webhookTransactionPaid);

module.exports = router;
