const express = require('express');
const router = express.Router();
const transactionUpdateController = require('../controllers/transactionUpdateController');

/**
 * @swagger
 * components:
 *   schemas:
 *     TransactionUpdate:
 *       type: object
 *       required:
 *         - new_status
 *         - transaction_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del estado de actualización de la transacción
 *         new_status:
 *           type: string
 *           enum: [approved, rejected]
 *           description: Nuevo estado de la transacción
 *         update_date:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la actualización
 *         transaction_id:
 *           type: integer
 *           description: ID de la transacción relacionada
 */

/**
 * @swagger
 * /api/transaction-updates:
 *   post:
 *     summary: Crear una nueva actualización de estado de la transacción
 *     tags: [TransactionUpdate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionUpdate'
 *     responses:
 *       201:
 *         description: Estado de actualización de transacción creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionUpdate'
 *       500:
 *         description: Error en el servidor
 */
router.post('/transaction-updates', transactionUpdateController.createTransactionUpdate);

/**
 * @swagger
 * /api/transaction-updates:
 *   get:
 *     summary: Obtener la lista de actualizaciones de transacciones
 *     tags: [TransactionUpdate]
 *     responses:
 *       200:
 *         description: Lista de actualizaciones de transacciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TransactionUpdate'
 *       500:
 *         description: Error en el servidor
 */
router.get('/transaction-updates', transactionUpdateController.getAllTransactionUpdates);

/**
 * @swagger
 * /api/transaction-updates/{id}:
 *   get:
 *     summary: Obtener una actualización de transacción por ID
 *     tags: [TransactionUpdate]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la actualización de transacción
 *     responses:
 *       200:
 *         description: Actualización de transacción encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionUpdate'
 *       404:
 *         description: Actualización de transacción no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/transaction-updates/:id', transactionUpdateController.getTransactionUpdateById);

/**
 * @swagger
 * /api/transaction-updates/{id}:
 *   put:
 *     summary: Actualizar una actualización de transacción por ID
 *     tags: [TransactionUpdate]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la actualización de transacción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionUpdate'
 *     responses:
 *       200:
 *         description: Actualización de transacción actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionUpdate'
 *       404:
 *         description: Actualización de transacción no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/transaction-updates/:id', transactionUpdateController.updateTransactionUpdate);

/**
 * @swagger
 * /api/transaction-updates/{id}:
 *   delete:
 *     summary: Eliminar una actualización de transacción por ID
 *     tags: [TransactionUpdate]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la actualización de transacción
 *     responses:
 *       204:
 *         description: Actualización de transacción eliminada con éxito
 *       404:
 *         description: Actualización de transacción no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/transaction-updates/:id', transactionUpdateController.deleteTransactionUpdate);

module.exports = router;
