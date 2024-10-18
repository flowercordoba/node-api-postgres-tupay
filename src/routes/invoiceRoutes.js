const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/InvoiceController');

/**
 * @swagger
 * /api/invoices:
 *   post:
 *     summary: Crear una nueva factura
 *     tags: [Invoice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoice_number:
 *                 type: string
 *                 description: Número de factura
 *               transaction_id:
 *                 type: integer
 *                 description: ID de la transacción asociada
 *               amount:
 *                 type: number
 *                 format: decimal
 *                 description: Monto de la factura
 *               status:
 *                 type: string
 *                 enum: [pending, paid, canceled]
 *                 description: Estado de la factura
 *     responses:
 *       201:
 *         description: Factura creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.post('/invoices', invoiceController.createInvoice);

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Obtener todas las facturas
 *     tags: [Invoice]
 *     responses:
 *       200:
 *         description: Lista de facturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 *       500:
 *         description: Error en el servidor
 */
router.get('/invoices', invoiceController.getAllInvoices);

/**
 * @swagger
 * /api/invoices/{id}:
 *   get:
 *     summary: Obtener una factura por ID
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Factura encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/invoices/:id', invoiceController.getInvoiceById);

/**
 * @swagger
 * /api/invoices/{id}:
 *   put:
 *     summary: Actualizar una factura por ID
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoice_number:
 *                 type: string
 *                 description: Número de factura
 *               transaction_id:
 *                 type: integer
 *                 description: ID de la transacción asociada
 *               amount:
 *                 type: number
 *                 format: decimal
 *                 description: Monto de la factura
 *               status:
 *                 type: string
 *                 enum: [pending, paid, canceled]
 *                 description: Estado de la factura
 *     responses:
 *       200:
 *         description: Factura actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/invoices/:id', invoiceController.updateInvoice);

/**
 * @swagger
 * /api/invoices/{id}:
 *   delete:
 *     summary: Eliminar una factura por ID
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la factura
 *     responses:
 *       204:
 *         description: Factura eliminada con éxito
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/invoices/:id', invoiceController.deleteInvoice);

module.exports = router;
