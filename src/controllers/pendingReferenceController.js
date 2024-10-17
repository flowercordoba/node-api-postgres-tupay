const db = require('../models');
const PendingReference = db.PendingReference;

// Crear una nueva Pending Reference
exports.createPendingReference = async (req, res) => {
    try {
        const { status, reference_date, user_id, provider_id } = req.body;
        const pendingReference = await PendingReference.create({
            status,
            reference_date,
            user_id,
            provider_id,
        });
        res.status(201).json(pendingReference);
    } catch (error) {
        res.status(500).json({ error: 'Error creando la Pending Reference', details: error.message });
    }
};

// Obtener todas las Pending References
exports.getAllPendingReferences = async (req, res) => {
    try {
        const pendingReferences = await PendingReference.findAll();
        res.status(200).json(pendingReferences);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo las Pending References', details: error.message });
    }
};

// Obtener una Pending Reference por ID
exports.getPendingReferenceById = async (req, res) => {
    try {
        const pendingReference = await PendingReference.findByPk(req.params.id);
        if (!pendingReference) {
            return res.status(404).json({ error: 'Pending Reference no encontrada' });
        }
        res.status(200).json(pendingReference);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo la Pending Reference', details: error.message });
    }
};

// Actualizar una Pending Reference por ID
exports.updatePendingReference = async (req, res) => {
    try {
        const { status, reference_date, user_id, provider_id } = req.body;
        const pendingReference = await PendingReference.findByPk(req.params.id);
        if (!pendingReference) {
            return res.status(404).json({ error: 'Pending Reference no encontrada' });
        }
        await pendingReference.update({
            status,
            reference_date,
            user_id,
            provider_id,
        });
        res.status(200).json(pendingReference);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando la Pending Reference', details: error.message });
    }
};

// Eliminar una Pending Reference por ID
exports.deletePendingReference = async (req, res) => {
    try {
        const pendingReference = await PendingReference.findByPk(req.params.id);
        if (!pendingReference) {
            return res.status(404).json({ error: 'Pending Reference no encontrada' });
        }
        await pendingReference.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando la Pending Reference', details: error.message });
    }
};
