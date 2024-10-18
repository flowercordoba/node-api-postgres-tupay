// routes/interbancoRoutes.js

const express = require('express');
const router = express.Router();
const InterbancoController = require('../controllers/InterbancoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     InterbancoReference:
 *       type: object
 *       properties:
 *         reference:
 *           type: string
 *           description: La referencia única de la transacción
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           description: Estado de la transacción
 */

/**
 * @swagger
 * /api/v2/interbanco/{referencia}:
 *   get:
 *     summary: Consultar referencia
 *     tags: [Interbanco]
 *     parameters:
 *       - in: path
 *         name: referencia
 *         required: true
 *         description: La referencia de la transacción a consultar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Referencia consultada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterbancoReference'
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:referencia', InterbancoController.getProvidersForReference);

/**
 * @swagger
 * /api/v2/changeinterbanco:
 *   post:
 *     summary: Aprobar referencia
 *     tags: [Interbanco]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ref:
 *                 type: string
 *                 description: La referencia de la transacción a aprobar
 *     responses:
 *       200:
 *         description: Referencia aprobada exitosamente
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error del servidor
 */
router.post('/changeinterbanco', InterbancoController.approveReference);

module.exports = router;
