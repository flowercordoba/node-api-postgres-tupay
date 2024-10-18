const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/payinController');

/**
 * @swagger
 * /api/payin:
 *   post:
 *     summary: Registrar un pago (payin)
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
 *                 description: La referencia única de la transacción.
 *               amount:
 *                 type: number
 *                 description: Monto del pago.
 *               currency:
 *                 type: string
 *                 description: Tipo de moneda.
 *               numdoc:
 *                 type: string
 *                 description: Número de identificación del usuario.
 *               username:
 *                 type: string
 *                 description: Nombre del usuario.
 *               userphone:
 *                 type: string
 *                 description: Número de teléfono del usuario.
 *               useremail:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               method:
 *                 type: string
 *                 description: Método de pago utilizado.
 *               provider_id:
 *                 type: integer
 *                 description: ID del proveedor asociado al pago.
 *     responses:
 *       201:
 *         description: Pago registrado y factura creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 transaction:
 *                   $ref: '#/components/schemas/Transaction'
 *                 invoice:
 *                   $ref: '#/components/schemas/Invoice'
 *       500:
 *         description: Error al registrar el pago.
 */
router.post('/payin', transactionController.createPayin);

/**
 * @swagger
 * /api/payin/webhook/payment-confirmed:
 *   post:
 *     summary: Webhook para notificar que un pago ha sido confirmado por el proveedor.
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
 *                 description: La referencia de la transacción pagada.
 *     responses:
 *       200:
 *         description: Estado de la transacción y factura actualizado a pagado.
 *       404:
 *         description: Transacción o factura no encontrada.
 *       500:
 *         description: Error al actualizar el estado de la transacción y factura.
 */
router.post('/webhook/payment-confirmed', transactionController.webhookPaymentConfirmed);

module.exports = router;
