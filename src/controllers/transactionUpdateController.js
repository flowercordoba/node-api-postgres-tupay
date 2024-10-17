const db = require('../models');
const TransactionUpdate = db.TransactionUpdate;

// Crear una nueva Transaction Update
exports.createTransactionUpdate = async (req, res) => {
    try {
        const { new_status, update_date, transaction_id } = req.body;
        const transactionUpdate = await TransactionUpdate.create({
            new_status,
            update_date,
            transaction_id,
        });
        res.status(201).json(transactionUpdate);
    } catch (error) {
        res.status(500).json({ error: 'Error creando el estado de actualización de la transacción', details: error.message });
    }
};

// Obtener todos los Transaction Updates
exports.getAllTransactionUpdates = async (req, res) => {
    try {
        const transactionUpdates = await TransactionUpdate.findAll();
        res.status(200).json(transactionUpdates);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los estados de actualización de transacciones', details: error.message });
    }
};

// Obtener un Transaction Update por ID
exports.getTransactionUpdateById = async (req, res) => {
    try {
        const transactionUpdate = await TransactionUpdate.findByPk(req.params.id);
        if (!transactionUpdate) {
            return res.status(404).json({ error: 'Estado de actualización de transacción no encontrado' });
        }
        res.status(200).json(transactionUpdate);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo el estado de actualización de la transacción', details: error.message });
    }
};

// Actualizar un Transaction Update por ID
exports.updateTransactionUpdate = async (req, res) => {
    try {
        const { new_status, update_date, transaction_id } = req.body;
        const transactionUpdate = await TransactionUpdate.findByPk(req.params.id);
        if (!transactionUpdate) {
            return res.status(404).json({ error: 'Estado de actualización de transacción no encontrado' });
        }
        await transactionUpdate.update({
            new_status,
            update_date,
            transaction_id,
        });
        res.status(200).json(transactionUpdate);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando el estado de actualización de la transacción', details: error.message });
    }
};

// Eliminar un Transaction Update por ID
exports.deleteTransactionUpdate = async (req, res) => {
    try {
        const transactionUpdate = await TransactionUpdate.findByPk(req.params.id);
        if (!transactionUpdate) {
            return res.status(404).json({ error: 'Estado de actualización de transacción no encontrado' });
        }
        await transactionUpdate.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando el estado de actualización de la transacción', details: error.message });
    }
};
