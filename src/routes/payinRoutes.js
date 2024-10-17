const express = require('express');
const router = express.Router();
const payinController = require('../controllers/payinController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Provider:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del proveedor
 *         name:
 *           type: string
 *           description: Nombre del proveedor
 *         paymentUrl:
 *           type: string
 *           description: URL de pago del proveedor
 * 
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la transacción
 *         user_id:
 *           type: integer
 *           description: ID del usuario asociado a la transacción
 *         reference:
 *           type: string
 *           description: Referencia única de la transacción
 *         amount:
 *           type: number
 *           format: float
 *           description: Monto de la transacción
 *         currency:
 *           type: string
 *           description: Moneda utilizada en la transacción
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           description: Estado actual de la transacción
 */

/**
 * @swagger
 * api/payin/providers/{reference}:
 *   get:
 *     summary: Obtener los proveedores disponibles para una transacción
 *     tags: [Payin]
 *     parameters:
 *       - in: path
 *         name: reference
 *         schema:
 *           type: string
 *           description: La referencia única de la transacción
 *         required: true
 *     responses:
 *       200:
 *         description: Proveedores disponibles obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Provider'
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/providers/:reference', payinController.getProvidersForReference);

/**
 * @swagger
 * api/payin/choose-provider:
 *   post:
 *     summary: Seleccionar un proveedor y enviar la referencia de pago
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
 *               providerId:
 *                 type: integer
 *                 description: ID del proveedor seleccionado
 *     responses:
 *       200:
 *         description: Proveedor seleccionado correctamente y redirigido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *                 redirectUrl:
 *                   type: string
 *                   description: URL de pago a la que se redirige al usuario
 *       404:
 *         description: Transacción o proveedor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.post('/choose-provider', payinController.sendReferenceToProvider);

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
