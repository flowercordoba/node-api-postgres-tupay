const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Provider:
 *       type: object
 *       required:
 *         - name
 *         - api_key
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del proveedor
 *         name:
 *           type: string
 *           description: Nombre del proveedor
 *         contact_email:
 *           type: string
 *           description: Email de contacto del proveedor
 *         api_key:
 *           type: string
 *           description: Clave API única del proveedor
 *         is_active:
 *           type: boolean
 *           description: Estado del proveedor
 */

/**
 * @swagger
 * /api/providers:
 *   post:
 *     summary: Crear un nuevo proveedor
 *     tags: [Provider]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Provider'
 *     responses:
 *       201:
 *         description: Proveedor creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       500:
 *         description: Error en el servidor
 */
router.post('/providers', providerController.createProvider);

/**
 * @swagger
 * /api/providers:
 *   get:
 *     summary: Obtener la lista de proveedores
 *     tags: [Provider]
 *     responses:
 *       200:
 *         description: Lista de proveedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Provider'
 *       500:
 *         description: Error en el servidor
 */
router.get('/providers', providerController.getAllProviders);

/**
 * @swagger
 * /api/providers/{id}:
 *   get:
 *     summary: Obtener un proveedor por ID
 *     tags: [Provider]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proveedor
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/providers/:id', providerController.getProviderById);

/**
 * @swagger
 * /api/providers/{id}:
 *   put:
 *     summary: Actualizar un proveedor por ID
 *     tags: [Provider]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Provider'
 *     responses:
 *       200:
 *         description: Proveedor actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/providers/:id', providerController.updateProvider);

/**
 * @swagger
 * /api/providers/{id}:
 *   delete:
 *     summary: Eliminar un proveedor por ID
 *     tags: [Provider]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proveedor
 *     responses:
 *       204:
 *         description: Proveedor eliminado con éxito
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/providers/:id', providerController.deleteProvider);

module.exports = router;
