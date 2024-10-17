const express = require('express');
const router = express.Router();
const userDataController = require('../controllers/userDataController');

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obtener la información básica del usuario
 *     tags: [User Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario obtenidos con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/user/:id', userDataController.getUserInfo);

/**
 * @swagger
 * /api/user/{id}/transactions:
 *   get:
 *     summary: Obtener todas las transacciones del usuario
 *     tags: [User Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de transacciones obtenida con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/user/:id/transactions', userDataController.getUserTransactions);

/**
 * @swagger
 * /api/user/{id}/pending-references:
 *   get:
 *     summary: Obtener todas las referencias pendientes del usuario
 *     tags: [User Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de referencias pendientes obtenida con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/user/:id/pending-references', userDataController.getUserPendingReferences);

/**
 * @swagger
 * /api/user/{id}/global-transactions:
 *   get:
 *     summary: Obtener todas las transacciones globales del usuario
 *     tags: [User Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de transacciones globales obtenida con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/user/:id/global-transactions', userDataController.getUserGlobalTransactions);

module.exports = router;
