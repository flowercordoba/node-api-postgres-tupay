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
 *           description: ID de la Transacción
 *         transaction_type:
 *           type: string
 *           enum: [payin, payout]
 *           description: Tipo de transacción
 *         amount:
 *           type: number
 *           format: decimal
 *           description: Monto de la transacción
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           description: Estado de la transacción
 *         transaction_date:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la transacción
 *         user_id:
 *           type: integer
 *           description: ID del usuario relacionado
 *         provider_id:
 *           type: integer
 *           description: ID del proveedor relacionado
 */

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Crear una nueva Transacción
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
 *       500:
 *         description: Error en el servidor
 */
router.post('/transactions', transactionController.createTransaction);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Obtener la lista de Transacciones
 *     tags: [Transaction]
 *     responses:
 *       200:
 *         description: Lista de transacciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Error en el servidor
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
 *         description: ID de la transacción
 *     responses:
 *       200:
 *         description: Transacción encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error en el servidor
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
 *         description: ID de la transacción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transacción actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error en el servidor
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
 *         description: ID de la transacción
 *     responses:
 *       204:
 *         description: Transacción eliminada con éxito
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/transactions/:id', transactionController.deleteTransaction);

module.exports = router;
