const express = require('express');
const router = express.Router();
const apiKeyController = require('../controllers/apiKeyController');

/**
 * @swagger
 * components:
 *   schemas:
 *     ApiKey:
 *       type: object
 *       required:
 *         - api_key
 *         - provider_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del API Key
 *         api_key:
 *           type: string
 *           description: API Key único
 *         is_active:
 *           type: boolean
 *           description: Estado de activación del API Key
 *         provider_id:
 *           type: integer
 *           description: ID del proveedor asociado
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 */

/**
 * @swagger
 * /api/api-keys:
 *   post:
 *     summary: Crear un nuevo API Key
 *     tags: [ApiKey]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiKey'
 *     responses:
 *       201:
 *         description: API Key creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiKey'
 *       500:
 *         description: Error en el servidor
 */
router.post('/api-keys', apiKeyController.createApiKey);

/**
 * @swagger
 * /api/api-keys:
 *   get:
 *     summary: Obtener la lista de API Keys
 *     tags: [ApiKey]
 *     responses:
 *       200:
 *         description: Lista de API Keys
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ApiKey'
 *       500:
 *         description: Error en el servidor
 */
router.get('/api-keys', apiKeyController.getAllApiKeys);

/**
 * @swagger
 * /api/api-keys/{id}:
 *   get:
 *     summary: Obtener un API Key por ID
 *     tags: [ApiKey]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del API Key
 *     responses:
 *       200:
 *         description: API Key encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiKey'
 *       404:
 *         description: API Key no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/api-keys/:id', apiKeyController.getApiKeyById);

/**
 * @swagger
 * /api/api-keys/{id}:
 *   put:
 *     summary: Actualizar un API Key por ID
 *     tags: [ApiKey]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del API Key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiKey'
 *     responses:
 *       200:
 *         description: API Key actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiKey'
 *       404:
 *         description: API Key no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/api-keys/:id', apiKeyController.updateApiKey);

/**
 * @swagger
 * /api/api-keys/{id}:
 *   delete:
 *     summary: Eliminar un API Key por ID
 *     tags: [ApiKey]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del API Key
 *     responses:
 *       204:
 *         description: API Key eliminado con éxito
 *       404:
 *         description: API Key no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/api-keys/:id', apiKeyController.deleteApiKey);

module.exports = router;
