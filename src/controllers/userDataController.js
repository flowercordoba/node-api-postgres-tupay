const db = require('../models');
const User = db.User;
const Transaction = db.Transaction;
const PendingReference = db.PendingReference;
const GlobalUserTransaction = db.GlobalUserTransaction;

// Obtener la información básica del usuario
exports.getUserInfo = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo los datos del usuario', details: error.message });
    }
};

// Obtener todas las transacciones del usuario
exports.getUserTransactions = async (req, res) => {
    try {
        const userId = req.params.id;
        const transactions = await Transaction.findAll({ where: { user_id: userId } });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo las transacciones', details: error.message });
    }
};

// Obtener todas las referencias pendientes del usuario
exports.getUserPendingReferences = async (req, res) => {
    try {
        const userId = req.params.id;
        const pendingReferences = await PendingReference.findAll({ where: { user_id: userId } });
        res.status(200).json(pendingReferences);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo las referencias pendientes', details: error.message });
    }
};

// Obtener todas las transacciones globales del usuario
exports.getUserGlobalTransactions = async (req, res) => {
    try {
        const userId = req.params.id;
        const globalTransactions = await GlobalUserTransaction.findAll({ where: { user_id: userId } });
        res.status(200).json(globalTransactions);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo las transacciones globales', details: error.message });
    }
};
