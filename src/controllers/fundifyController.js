const { Op } = require('sequelize');
const Transaction = require('../models/Transaction');

// Función genérica para obtener transacciones con paginación
const getTransactionsWithPagination = async (filter, limit = 20, offset = 0) => {
    return Transaction.findAll({
        where: filter,
        limit: limit,
        offset: offset,
        order: [['transaction_date', 'DESC']],
    });
};

// Obtener transacciones completadas
exports.getCompletedTransactions = async (req, res) => {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    try {
        const transactions = await getTransactionsWithPagination({ status: 'completed' }, limit, offset);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener transacciones completadas', error });
    }
};

// Obtener transacciones pendientes
exports.getPendingTransactions = async (req, res) => {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    try {
        const transactions = await getTransactionsWithPagination({ status: 'pending' }, limit, offset);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener transacciones pendientes', error });
    }
};

// Obtener transacciones de la última hora
exports.getTransactionsLastHour = async (req, res) => {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    try {
        const transactions = await getTransactionsWithPagination(
            { transaction_date: { [Op.gte]: oneHourAgo } },
            limit,
            offset
        );
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener transacciones de la última hora', error });
    }
};

// Obtener transacciones de las últimas 24 horas
exports.getTransactionsLast24Hours = async (req, res) => {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);

    try {
        const transactions = await getTransactionsWithPagination(
            { transaction_date: { [Op.gte]: oneDayAgo } },
            limit,
            offset
        );
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener transacciones de las últimas 24 horas', error });
    }
};

// Obtener transacciones de la última semana
exports.getTransactionsLastWeek = async (req, res) => {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    try {
        const transactions = await getTransactionsWithPagination(
            { transaction_date: { [Op.gte]: oneWeekAgo } },
            limit,
            offset
        );
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener transacciones de la última semana', error });
    }
};

// Obtener transacción por referencia
exports.getTransactionByReference = async (req, res) => {
    const { reference } = req.params;

    try {
        const transaction = await Transaction.findOne({ where: { reference } });
        if (!transaction) {
            return res.status(404).json({ message: 'Transacción no encontrada' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la transacción por referencia', error });
    }
};

// Webhook para notificar que una transacción fue pagada
exports.webhookTransactionPaid = async (req, res) => {
    const { reference } = req.body;

    try {
        const transaction = await Transaction.findOne({ where: { reference } });
        if (!transaction) {
            return res.status(404).json({ message: 'Transacción no encontrada' });
        }

        transaction.status = 'completed';
        await transaction.save();

        res.status(200).json({ message: 'Estado de la transacción actualizado a completado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado de la transacción', error });
    }
};
