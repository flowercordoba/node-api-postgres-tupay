const db = require('../models');
const GlobalUserTransaction = db.GlobalUserTransaction;

// Crear una nueva Global User Transaction
exports.createGlobalUserTransaction = async (req, res) => {
    try {
        const { transaction_type, amount, status, executed_at, user_id, transaction_id, provider_id } = req.body;
        const globalUserTransaction = await GlobalUserTransaction.create({
            transaction_type,
            amount,
            status,
            executed_at,
            user_id,
            transaction_id,
            provider_id,
        });
        res.status(201).json(globalUserTransaction);
    } catch (error) {
        res.status(500).json({ error: 'Error creando la Global User Transaction', details: error.message });
    }
};

// Obtener todas las Global User Transactions
exports.getAllGlobalUserTransactions = async (req, res) => {
    try {
        const globalUserTransactions = await GlobalUserTransaction.findAll();
        res.status(200).json(globalUserTransactions);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo las Global User Transactions', details: error.message });
    }
};

// Obtener una Global User Transaction por ID
exports.getGlobalUserTransactionById = async (req, res) => {
    try {
        const globalUserTransaction = await GlobalUserTransaction.findByPk(req.params.id);
        if (!globalUserTransaction) {
            return res.status(404).json({ error: 'Global User Transaction no encontrada' });
        }
        res.status(200).json(globalUserTransaction);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo la Global User Transaction', details: error.message });
    }
};

// Actualizar una Global User Transaction por ID
exports.updateGlobalUserTransaction = async (req, res) => {
    try {
        const { transaction_type, amount, status, executed_at, user_id, transaction_id, provider_id } = req.body;
        const globalUserTransaction = await GlobalUserTransaction.findByPk(req.params.id);
        if (!globalUserTransaction) {
            return res.status(404).json({ error: 'Global User Transaction no encontrada' });
        }
        await globalUserTransaction.update({
            transaction_type,
            amount,
            status,
            executed_at,
            user_id,
            transaction_id,
            provider_id,
        });
        res.status(200).json(globalUserTransaction);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando la Global User Transaction', details: error.message });
    }
};

// Eliminar una Global User Transaction por ID
exports.deleteGlobalUserTransaction = async (req, res) => {
    try {
        const globalUserTransaction = await GlobalUserTransaction.findByPk(req.params.id);
        if (!globalUserTransaction) {
            return res.status(404).json({ error: 'Global User Transaction no encontrada' });
        }
        await globalUserTransaction.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando la Global User Transaction', details: error.message });
    }
};
