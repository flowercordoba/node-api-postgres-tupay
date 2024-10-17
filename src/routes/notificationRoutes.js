const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - message
 *         - user_id
 *         - transaction_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la Notificación
 *         message:
 *           type: string
 *           description: Mensaje de la notificación
 *         notification_date:
 *           type: string
 *           format: date-time
 *           description: Fecha de la notificación
 *         user_id:
 *           type: integer
 *           description: ID del usuario relacionado
 *         transaction_id:
 *           type: integer
 *           description: ID de la transacción relacionada
 */

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Crear una nueva Notificación
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Notificación creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Error en el servidor
 */
router.post('/notifications', notificationController.createNotification);

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Obtener la lista de Notificaciones
 *     tags: [Notification]
 *     responses:
 *       200:
 *         description: Lista de Notificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Error en el servidor
 */
router.get('/notifications', notificationController.getAllNotifications);

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Obtener una Notificación por ID
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Notificación
 *     responses:
 *       200:
 *         description: Notificación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/notifications/:id', notificationController.getNotificationById);

/**
 * @swagger
 * /api/notifications/{id}:
 *   put:
 *     summary: Actualizar una Notificación por ID
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Notificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: Notificación actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/notifications/:id', notificationController.updateNotification);

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Eliminar una Notificación por ID
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Notificación
 *     responses:
 *       204:
 *         description: Notificación eliminada con éxito
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/notifications/:id', notificationController.deleteNotification);

module.exports = router;
