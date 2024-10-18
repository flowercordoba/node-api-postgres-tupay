const db = require('../models');
const Provider = db.Provider;

// Crear un nuevo proveedor
exports.createProvider = async (req, res) => {
    const { name, contact_email, api_key, country } = req.body;

    try {
        const provider = await Provider.create({ name, contact_email, api_key, country });
        res.status(201).json(provider);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el proveedor', details: error.message });
    }
};

// Obtener todos los proveedores
exports.getAllProviders = async (req, res) => {
    try {
        const providers = await Provider.findAll();
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los proveedores', details: error.message });
    }
};

// Obtener un proveedor por ID
exports.getProviderById = async (req, res) => {
    const { id } = req.params;

    try {
        const provider = await Provider.findByPk(id);
        if (!provider) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.status(200).json(provider);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el proveedor', details: error.message });
    }
};

// Actualizar un proveedor por ID
exports.updateProvider = async (req, res) => {
    const { id } = req.params;
    const { name, contact_email, api_key, country } = req.body;

    try {
        const provider = await Provider.findByPk(id);
        if (!provider) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        await provider.update({ name, contact_email, api_key, country });
        res.status(200).json(provider);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el proveedor', details: error.message });
    }
};

// Eliminar un proveedor por ID
exports.deleteProvider = async (req, res) => {
    const { id } = req.params;

    try {
        const provider = await Provider.findByPk(id);
        if (!provider) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        await provider.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el proveedor', details: error.message });
    }
};


// Obtener proveedores por código de país
exports.getProvidersByCountry = async (req, res) => {
    const { country } = req.params;

    // Validar que el código de país tenga dos caracteres
    if (country.length !== 2) {
        return res.status(400).json({ message: 'El código de país debe ser de dos caracteres según la norma ISO 3166-1 alpha-2.' });
    }

    try {
        const providers = await Provider.findAll({ where: { country } });
        if (providers.length === 0) {
            return res.status(404).json({ message: 'No se encontraron proveedores para este país.' });
        }
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los proveedores por país', error });
    }
};
