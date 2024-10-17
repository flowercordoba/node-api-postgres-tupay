const db = require('../models');
const Transaction = db.Transaction;

// Crear una nueva Transacción
exports.createTransaction = async (req, res) => {
  try {
    const { transaction_type, amount, status, transaction_date, user_id, provider_id } = req.body;
    const transaction = await Transaction.create({
      transaction_type,
      amount,
      status,
      transaction_date,
      user_id,
      provider_id,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error creando la transacción', details: error.message });
  }
};

// Obtener todas las Transacciones
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo las transacciones', details: error.message });
  }
};

// Obtener una Transacción por ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo la transacción', details: error.message });
  }
};

// Actualizar una Transacción por ID
exports.updateTransaction = async (req, res) => {
  try {
    const { transaction_type, amount, status, transaction_date, user_id, provider_id } = req.body;
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }
    await transaction.update({
      transaction_type,
      amount,
      status,
      transaction_date,
      user_id,
      provider_id,
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando la transacción', details: error.message });
  }
};

// Eliminar una Transacción por ID
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }
    await transaction.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando la transacción', details: error.message });
  }
};
