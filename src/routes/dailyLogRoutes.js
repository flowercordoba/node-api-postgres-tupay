const express = require('express');
const router = express.Router();
const dailyLogController = require('../controllers/dailyLogController');

/**
 * @swagger
 * components:
 *   schemas:
 *     DailyLog:
 *       type: object
 *       required:
 *         - log_date
 *         - transaction_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del Daily Log
 *         log_date:
 *           type: string
 *           format: date
 *           description: Fecha del registro
 *         details:
 *           type: string
 *           description: Detalles adicionales del registro
 *         transaction_id:
 *           type: integer
 *           description: ID de la transacción relacionada
 */

/**
 * @swagger
 * /api/daily-logs:
 *   post:
 *     summary: Crear un nuevo Daily Log
 *     tags: [DailyLog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DailyLog'
 *     responses:
 *       201:
 *         description: Daily Log creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DailyLog'
 *       500:
 *         description: Error en el servidor
 */
router.post('/daily-logs', dailyLogController.createDailyLog);

/**
 * @swagger
 * /api/daily-logs:
 *   get:
 *     summary: Obtener la lista de Daily Logs
 *     tags: [DailyLog]
 *     responses:
 *       200:
 *         description: Lista de Daily Logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DailyLog'
 *       500:
 *         description: Error en el servidor
 */
router.get('/daily-logs', dailyLogController.getAllDailyLogs);

/**
 * @swagger
 * /api/daily-logs/{id}:
 *   get:
 *     summary: Obtener un Daily Log por ID
 *     tags: [DailyLog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del Daily Log
 *     responses:
 *       200:
 *         description: Daily Log encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DailyLog'
 *       404:
 *         description: Daily Log no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/daily-logs/:id', dailyLogController.getDailyLogById);

/**
 * @swagger
 * /api/daily-logs/{id}:
 *   put:
 *     summary: Actualizar un Daily Log por ID
 *     tags: [DailyLog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del Daily Log
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DailyLog'
 *     responses:
 *       200:
 *         description: Daily Log actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DailyLog'
 *       404:
 *         description: Daily Log no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/daily-logs/:id', dailyLogController.updateDailyLog);

/**
 * @swagger
 * /api/daily-logs/{id}:
 *   delete:
 *     summary: Eliminar un Daily Log por ID
 *     tags: [DailyLog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del Daily Log
 *     responses:
 *       204:
 *         description: Daily Log eliminado con éxito
 *       404:
 *         description: Daily Log no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/daily-logs/:id', dailyLogController.deleteDailyLog);

module.exports = router;
