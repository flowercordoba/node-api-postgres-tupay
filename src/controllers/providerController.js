const db = require('../models');
const Provider = db.Provider;

// Crear un nuevo Provider
exports.createProvider = async (req, res) => {
    try {
        const { name, contact_email, api_key, is_active } = req.body;
        const provider = await Provider.create({
            name,
            contact_email,
            api_key,
            is_active,
        });
        res.status(201).json(provider);
    } catch (error) {
        res.status(500).json({ error: 'Error creando el proveedor', details: error.message });
    }
};

// Obtener todos los Providers
exports.getAllProviders = async (req, res) => {
    try {
        const providers = await Provider.findAll();
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los proveedores', details: error.message });
    }
};

// Obtener un Provider por ID
exports.getProviderById = async (req, res) => {
    try {
        const provider = await Provider.findByPk(req.params.id);
        if (!provider) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.status(200).json(provider);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo el proveedor', details: error.message });
    }
};

// Actualizar un Provider por ID
exports.updateProvider = async (req, res) => {
    try {
        const { name, contact_email, api_key, is_active } = req.body;
        const provider = await Provider.findByPk(req.params.id);
        if (!provider) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        await provider.update({
            name,
            contact_email,
            api_key,
            is_active,
        });
        res.status(200).json(provider);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando el proveedor', details: error.message });
    }
};

// Eliminar un Provider por ID
exports.deleteProvider = async (req, res) => {
    try {
        const provider = await Provider.findByPk(req.params.id);
        if (!provider) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        await provider.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando el proveedor', details: error.message });
    }
};
