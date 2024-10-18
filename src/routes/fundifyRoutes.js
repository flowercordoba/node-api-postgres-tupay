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
 *       required: false
 *       schema:
 *         type: integer
 *         default: 20
 *       description: 
 *         El número máximo de resultados por página. Por defecto, es 20.
 *     offsetParam:
 *       in: query
 *       name: offset
 *       required: false
 *       schema:
 *         type: integer
 *         default: 0
 *       description: 
 *         El desplazamiento para la paginación. Indica el número de elementos a omitir; por defecto, es 0.
 *
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - id
 *         - transaction_type
 *         - amount
 *         - status
 *         - user_id
 *         - provider_id
 *         - reference
 *         - currency
 *         - numdoc
 *         - username
 *         - userphone
 *         - useremail
 *         - userbank
 *         - usernumaccount
 *         - typetransaction
 *         - method
 *         - accountNumber
 *         - bankAgreementNumber
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la transacción.
 *         transaction_type:
 *           type: string
 *           enum: [payin, payout]
 *           description: Tipo de transacción.
 *         amount:
 *           type: number
 *           format: decimal
 *           description: Monto de la transacción.
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           description: Estado de la transacción.
 *         transaction_date:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la transacción.
 *         user_id:
 *           type: integer
 *           description: ID del usuario relacionado.
 *         provider_id:
 *           type: integer
 *           description: ID del proveedor relacionado.
 *         reference:
 *           type: string
 *           description: Referencia única de la transacción.
 *         currency:
 *           type: string
 *           description: Código de moneda de la transacción.
 *         numdoc:
 *           type: string
 *           description: Número de identificación del usuario.
 *         username:
 *           type: string
 *           description: Nombre del usuario.
 *         userphone:
 *           type: string
 *           description: Número de teléfono del usuario.
 *         useremail:
 *           type: string
 *           description: Correo electrónico del usuario.
 *         userbank:
 *           type: string
 *           description: Nombre del banco del usuario.
 *         usernumaccount:
 *           type: string
 *           description: Número de cuenta del usuario.
 *         typetransaction:
 *           type: string
 *           description: Tipo de transacción (por ejemplo, depósito, retiro).
 *         method:
 *           type: string
 *           description: Método de pago utilizado.
 *         accountNumber:
 *           type: string
 *           description: Número de cuenta utilizado para la transacción.
 *         bankAgreementNumber:
 *           type: string
 *           description: Número de acuerdo bancario asociado.
 *         paymentReceipt:
 *           type: string
 *           description: Recibo de pago, si aplica.
 */

/**
 * @swagger
 * /api/fundify/transactions/completed:
 *   get:
 *     summary: Obtener todas las transacciones completadas con paginación.
 *     tags: [Fundify]
 *     parameters:
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/offsetParam'
 *     responses:
 *       200:
 *         description: Lista de transacciones completadas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Error del servidor.
 */
router.get('/transactions/completed', fundifyController.getCompletedTransactions);

/**
 * @swagger
 * /api/fundify/transactions/pending:
 *   get:
 *     summary: Obtener todas las transacciones pendientes con paginación.
 *     tags: [Fundify]
 *     parameters:
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/offsetParam'
 *     responses:
 *       200:
 *         description: Lista de transacciones pendientes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Error del servidor.
 */
router.get('/transactions/pending', fundifyController.getPendingTransactions);

/**
 * @swagger
 * /api/fundify/transactions/last-hour:
 *   get:
 *     summary: Obtener todas las transacciones de la última hora con paginación.
 *     tags: [Fundify]
 *     parameters:
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/offsetParam'
 *     responses:
 *       200:
 *         description: Lista de transacciones de la última hora.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Error del servidor.
 */
router.get('/transactions/last-hour', fundifyController.getTransactionsLastHour);

/**
 * @swagger
 * /api/fundify/transactions/last-24-hours:
 *   get:
 *     summary: Obtener todas las transacciones de las últimas 24 horas con paginación.
 *     tags: [Fundify]
 *     parameters:
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/offsetParam'
 *     responses:
 *       200:
 *         description: Lista de transacciones de las últimas 24 horas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Error del servidor.
 */
router.get('/transactions/last-24-hours', fundifyController.getTransactionsLast24Hours);

/**
 * @swagger
 * /api/fundify/transactions/last-week:
 *   get:
 *     summary: Obtener todas las transacciones de la última semana con paginación.
 *     tags: [Fundify]
 *     parameters:
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/offsetParam'
 *     responses:
 *       200:
 *         description: Lista de transacciones de la última semana.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Error del servidor.
 */
router.get('/transactions/last-week', fundifyController.getTransactionsLastWeek);

/**
 * @swagger
 * /api/fundify/transactions/{reference}:
 *   get:
 *     summary: Obtener una transacción por referencia.
 *     tags: [Fundify]
 *     parameters:
 *       - in: path
 *         name: reference
 *         required: true
 *         schema:
 *           type: string
 *         description: Referencia única de la transacción.
 *     responses:
 *       200:
 *         description: Transacción obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transacción no encontrada.
 *       500:
 *         description: Error del servidor.
 */
router.get('/transactions/:reference', fundifyController.getTransactionByReference);

/**
 * @swagger
 * /api/fundify/webhook/transaction-paid:
 *   post:
 *     summary: Webhook para notificar que una transacción fue pagada.
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
 *                 description: La referencia de la transacción pagada.
 *     responses:
 *       200:
 *         description: Transacción actualizada correctamente.
 *       500:
 *         description: Error del servidor.
 */
router.post('/webhook/transaction-paid', fundifyController.webhookTransactionPaid);

module.exports = router;
