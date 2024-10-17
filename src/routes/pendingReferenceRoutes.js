const express = require('express');
const router = express.Router();
const pendingReferenceController = require('../controllers/pendingReferenceController');

/**
 * @swagger
 * components:
 *   schemas:
 *     PendingReference:
 *       type: object
 *       required:
 *         - status
 *         - user_id
 *         - provider_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la Pending Reference
 *         status:
 *           type: string
 *           enum: [pending, processed]
 *           description: Estado de la referencia
 *         reference_date:
 *           type: string
 *           format: date-time
 *           description: Fecha de referencia
 *         user_id:
 *           type: integer
 *           description: ID del usuario relacionado
 *         provider_id:
 *           type: integer
 *           description: ID del proveedor relacionado
 */

/**
 * @swagger
 * /api/pending-references:
 *   post:
 *     summary: Crear una nueva Pending Reference
 *     tags: [PendingReference]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PendingReference'
 *     responses:
 *       201:
 *         description: Pending Reference creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PendingReference'
 *       500:
 *         description: Error en el servidor
 */
router.post('/pending-references', pendingReferenceController.createPendingReference);

/**
 * @swagger
 * /api/pending-references:
 *   get:
 *     summary: Obtener la lista de Pending References
 *     tags: [PendingReference]
 *     responses:
 *       200:
 *         description: Lista de Pending References
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PendingReference'
 *       500:
 *         description: Error en el servidor
 */
router.get('/pending-references', pendingReferenceController.getAllPendingReferences);

/**
 * @swagger
 * /api/pending-references/{id}:
 *   get:
 *     summary: Obtener una Pending Reference por ID
 *     tags: [PendingReference]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Pending Reference
 *     responses:
 *       200:
 *         description: Pending Reference encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PendingReference'
 *       404:
 *         description: Pending Reference no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/pending-references/:id', pendingReferenceController.getPendingReferenceById);

/**
 * @swagger
 * /api/pending-references/{id}:
 *   put:
 *     summary: Actualizar una Pending Reference por ID
 *     tags: [PendingReference]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Pending Reference
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PendingReference'
 *     responses:
 *       200:
 *         description: Pending Reference actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PendingReference'
 *       404:
 *         description: Pending Reference no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/pending-references/:id', pendingReferenceController.updatePendingReference);

/**
 * @swagger
 * /api/pending-references/{id}:
 *   delete:
 *     summary: Eliminar una Pending Reference por ID
 *     tags: [PendingReference]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Pending Reference
 *     responses:
 *       204:
 *         description: Pending Reference eliminada con éxito
 *       404:
 *         description: Pending Reference no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/pending-references/:id', pendingReferenceController.deletePendingReference);

module.exports = router;
