const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - transaction_type
 *         - amount
 *         - status
 *         - user_id
 *         - provider_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la transacción
 *         transaction_type:
 *           type: string
 *           enum: [payin, payout]
 *           description: Tipo de transacción (indica si es una entrada o salida de fondos)
 *         amount:
 *           type: number
 *           format: decimal
 *           description: Monto total de la transacción
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           description: Estado actual de la transacción
 *         transaction_date:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora en que se registró la transacción
 *         user_id:
 *           type: integer
 *           description: ID del usuario asociado a la transacción
 *         provider_id:
 *           type: integer
 *           description: ID del proveedor asociado a la transacción
 *         userphone:
 *           type: string
 *           description: Número de teléfono del usuario
 *         useremail:
 *           type: string
 *           description: Correo electrónico del usuario
 *         userbank:
 *           type: string
 *           description: Nombre del banco del usuario
 *         usernumaccount:
 *           type: string
 *           description: Número de cuenta del usuario
 *         typetransaction:
 *           type: string
 *           description: Tipo de transacción (por ejemplo, depósito, retiro)
 *         method:
 *           type: string
 *           description: Método de pago utilizado para la transacción
 *         accountNumber:
 *           type: string
 *           description: Número de cuenta utilizada para la transacción
 *         bankAgreementNumber:
 *           type: string
 *           description: Número de acuerdo bancario asociado
 *         paymentReceipt:
 *           type: string
 *           description: Recibo de pago, si aplica
 *         expiration:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de expiración de la transacción
 */

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Crear una nueva transacción
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transacción creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Solicitud inválida, faltan campos requeridos
 *       500:
 *         description: Error en el servidor al crear la transacción
 */
router.post('/transactions', transactionController.createTransaction);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Obtener la lista de transacciones
 *     tags: [Transaction]
 *     responses:
 *       200:
 *         description: Lista de transacciones obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Error en el servidor al obtener la lista de transacciones
 */
router.get('/transactions', transactionController.getAllTransactions);

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Obtener una transacción por ID
 *     tags: [Transaction]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la transacción que se desea obtener
 *     responses:
 *       200:
 *         description: Transacción encontrada y devuelta con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error en el servidor al obtener la transacción
 */
router.get('/transactions/:id', transactionController.getTransactionById);

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Actualizar una transacción por ID
 *     tags: [Transaction]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la transacción que se desea actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transacción actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Solicitud inválida, faltan campos requeridos
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error en el servidor al actualizar la transacción
 */
router.put('/transactions/:id', transactionController.updateTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Eliminar una transacción por ID
 *     tags: [Transaction]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la transacción que se desea eliminar
 *     responses:
 *       204:
 *         description: Transacción eliminada con éxito
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error en el servidor al eliminar la transacción
 */
router.delete('/transactions/:id', transactionController.deleteTransaction);

module.exports = router;
