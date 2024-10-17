const express = require('express');
const router = express.Router();
const globalUserTransactionController = require('../controllers/globalUserTransactionController');

/**
 * @swagger
 * components:
 *   schemas:
 *     GlobalUserTransaction:
 *       type: object
 *       required:
 *         - transaction_type
 *         - amount
 *         - status
 *         - user_id
 *         - transaction_id
 *         - provider_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la Global User Transaction
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
 *         executed_at:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de ejecución de la transacción
 *         user_id:
 *           type: integer
 *           description: ID del usuario relacionado
 *         transaction_id:
 *           type: integer
 *           description: ID de la transacción
 *         provider_id:
 *           type: integer
 *           description: ID del proveedor relacionado
 */

/**
 * @swagger
 * /api/global-user-transactions:
 *   post:
 *     summary: Crear una nueva Global User Transaction
 *     tags: [GlobalUserTransaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GlobalUserTransaction'
 *     responses:
 *       201:
 *         description: Global User Transaction creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GlobalUserTransaction'
 *       500:
 *         description: Error en el servidor
 */
router.post('/global-user-transactions', globalUserTransactionController.createGlobalUserTransaction);

/**
 * @swagger
 * /api/global-user-transactions:
 *   get:
 *     summary: Obtener la lista de Global User Transactions
 *     tags: [GlobalUserTransaction]
 *     responses:
 *       200:
 *         description: Lista de Global User Transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GlobalUserTransaction'
 *       500:
 *         description: Error en el servidor
 */
router.get('/global-user-transactions', globalUserTransactionController.getAllGlobalUserTransactions);

/**
 * @swagger
 * /api/global-user-transactions/{id}:
 *   get:
 *     summary: Obtener una Global User Transaction por ID
 *     tags: [GlobalUserTransaction]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Global User Transaction
 *     responses:
 *       200:
 *         description: Global User Transaction encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GlobalUserTransaction'
 *       404:
 *         description: Global User Transaction no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/global-user-transactions/:id', globalUserTransactionController.getGlobalUserTransactionById);

/**
 * @swagger
 * /api/global-user-transactions/{id}:
 *   put:
 *     summary: Actualizar una Global User Transaction por ID
 *     tags: [GlobalUserTransaction]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Global User Transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GlobalUserTransaction'
 *     responses:
 *       200:
 *         description: Global User Transaction actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GlobalUserTransaction'
 *       404:
 *         description: Global User Transaction no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/global-user-transactions/:id', globalUserTransactionController.updateGlobalUserTransaction);

/**
 * @swagger
 * /api/global-user-transactions/{id}:
 *   delete:
 *     summary: Eliminar una Global User Transaction por ID
 *     tags: [GlobalUserTransaction]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Global User Transaction
 *     responses:
 *       204:
 *         description: Global User Transaction eliminada con éxito
 *       404:
 *         description: Global User Transaction no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/global-user-transactions/:id', globalUserTransactionController.deleteGlobalUserTransaction);

module.exports = router;
