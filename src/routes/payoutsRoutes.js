const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Payout:
 *       type: object
 *       required:
 *         - transaction_type
 *         - amount
 *         - status
 *         - user_id
 *         - provider_id
 *         - reference
 *         - expiration
 *         - currency
 *         - numdoc
 *         - username
 *         - userphone
 *         - useremail
 *         - userbank
 *         - usertypeaccount
 *         - usernumaccount
 *         - typetransaction
 *         - method
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la transacción
 *         transaction_type:
 *           type: string
 *           enum: [payin, payout]
 *           description: Tipo de transacción
 *         amount:
 *           type: string
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
 *         reference:
 *           type: string
 *           description: Referencia de pago
 *         expiration:
 *           type: string
 *           format: date
 *           description: Fecha de expiración del enlace de pago
 *         currency:
 *           type: string
 *           description: Tipo de moneda
 *         numdoc:
 *           type: string
 *           description: Número de identificación del usuario
 *         username:
 *           type: string
 *           description: Nombre del usuario
 *         userphone:
 *           type: string
 *           description: Número de celular del usuario
 *         useremail:
 *           type: string
 *           description: Correo electrónico del usuario
 *         userbank:
 *           type: string
 *           description: Nombre del banco del usuario
 *         usertypeaccount:
 *           type: string
 *           enum: [AHORRO, CORRIENTE]
 *           description: Tipo de cuenta bancaria
 *         usernumaccount:
 *           type: string
 *           description: Número de cuenta bancaria
 *         typetransaction:
 *           type: string
 *           description: Tipo de transacción
 *         method:
 *           type: string
 *           description: Método de pago utilizado
 */

/**
 * @swagger
 * /api/payouts:
 *   post:
 *     summary: Crear una nueva transacción de tipo payout
 *     tags: [Payout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payout'
 *     responses:
 *       201:
 *         description: Transacción de payout creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payout'
 *       400:
 *         description: Solicitud inválida, faltan campos requeridos
 *       500:
 *         description: Error en el servidor al crear la transacción
 */
router.post('/payouts', transactionController.createPayout);

/**
 * @swagger
 * /api/payouts:
 *   get:
 *     summary: Obtener la lista de transacciones de payout
 *     tags: [Payout]
 *     responses:
 *       200:
 *         description: Lista de transacciones de payout obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payout'
 *       500:
 *         description: Error en el servidor al obtener la lista de transacciones
 */
router.get('/payouts', transactionController.getAllTransactions);

/**
 * @swagger
 * /api/payouts/{id}:
 *   get:
 *     summary: Obtener una transacción de payout por ID
 *     tags: [Payout]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la transacción de payout que se desea obtener
 *     responses:
 *       200:
 *         description: Transacción de payout encontrada y devuelta con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payout'
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error en el servidor al obtener la transacción
 */
router.get('/payouts/:id', transactionController.getTransactionById);

/**
 * @swagger
 * /api/payouts/{id}:
 *   put:
 *     summary: Actualizar una transacción de payout por ID
 *     tags: [Payout]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la transacción de payout que se desea actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payout'
 *     responses:
 *       200:
 *         description: Transacción de payout actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payout'
 *       400:
 *         description: Solicitud inválida, faltan campos requeridos
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error en el servidor al actualizar la transacción
 */
router.put('/payouts/:id', transactionController.updateTransaction);

/**
 * @swagger
 * /api/payouts/{id}:
 *   delete:
 *     summary: Eliminar una transacción de payout por ID
 *     tags: [Payout]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la transacción de payout que se desea eliminar
 *     responses:
 *       204:
 *         description: Transacción de payout eliminada con éxito
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error en el servidor al eliminar la transacción
 */
router.delete('/payouts/:id', transactionController.deleteTransaction);

module.exports = router;
