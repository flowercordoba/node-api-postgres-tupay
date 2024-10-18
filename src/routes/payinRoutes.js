const express = require('express');
const router = express.Router();
const payinController = require('../controllers/payinController');


/**
 * @swagger
 * api/payin/webhook/payment-notification:
 *   post:
 *     summary: Webhook para notificar que un pago fue realizado exitosamente
 *     tags: [Payin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reference:
 *                 type: string
 *                 description: Referencia única de la transacción
 *     responses:
 *       200:
 *         description: Pago recibido y transacción actualizada
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error del servidor
 */
router.post('/webhook/payment-notification', payinController.paymentNotification);

/**
 * @swagger
 * api/payin/transaction/{reference}:
 *   get:
 *     summary: Obtener los detalles de una transacción por referencia
 *     tags: [Payin]
 *     parameters:
 *       - in: path
 *         name: reference
 *         schema:
 *           type: string
 *           description: Referencia única de la transacción
 *         required: true
 *     responses:
 *       200:
 *         description: Detalles de la transacción obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/transaction/:reference', payinController.getTransactionDetails);

module.exports = router;
