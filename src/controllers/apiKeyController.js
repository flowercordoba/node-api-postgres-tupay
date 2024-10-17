const db = require('../models');
const ApiKey = db.ApiKey;

// Crear un nuevo API Key
exports.createApiKey = async (req, res) => {
    try {
        const { api_key, is_active, provider_id } = req.body;
        const apiKey = await ApiKey.create({ api_key, is_active, provider_id });
        res.status(201).json(apiKey);
    } catch (error) {
        res.status(500).json({ error: 'Error creando el API Key', details: error.message });
    }
};

// Obtener todos los API Keys
exports.getAllApiKeys = async (req, res) => {
    try {
        const apiKeys = await ApiKey.findAll();
        res.status(200).json(apiKeys);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los API Keys', details: error.message });
    }
};

// Obtener un API Key por ID
exports.getApiKeyById = async (req, res) => {
    try {
        const apiKey = await ApiKey.findByPk(req.params.id);
        if (!apiKey) {
            return res.status(404).json({ error: 'API Key no encontrado' });
        }
        res.status(200).json(apiKey);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo el API Key', details: error.message });
    }
};

// Actualizar un API Key por ID
exports.updateApiKey = async (req, res) => {
    try {
        const { api_key, is_active, provider_id } = req.body;
        const apiKey = await ApiKey.findByPk(req.params.id);
        if (!apiKey) {
            return res.status(404).json({ error: 'API Key no encontrado' });
        }
        await apiKey.update({ api_key, is_active, provider_id });
        res.status(200).json(apiKey);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando el API Key', details: error.message });
    }
};

// Eliminar un API Key por ID
exports.deleteApiKey = async (req, res) => {
    try {
        const apiKey = await ApiKey.findByPk(req.params.id);
        if (!apiKey) {
            return res.status(404).json({ error: 'API Key no encontrado' });
        }
        await apiKey.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando el API Key', details: error.message });
    }
};
