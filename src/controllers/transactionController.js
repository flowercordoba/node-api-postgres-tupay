const db = require('../models');
const Transaction = db.Transaction;

// Validar campos requeridos
const validateTransactionFields = (req, res, next) => {
  const requiredFields = ['transaction_type', 'amount', 'status', 'transaction_date', 'user_id', 'provider_id'];
  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length) {
    return res.status(400).json({ error: 'Faltan campos requeridos', missingFields });
  }

  next();
};

// Crear una nueva Transacción
exports.createTransaction = [
  validateTransactionFields,
  async (req, res) => {
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
  }
];

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
exports.updateTransaction = [
  validateTransactionFields,
  async (req, res) => {
    try {
      const transaction = await Transaction.findByPk(req.params.id);
      if (!transaction) {
        return res.status(404).json({ error: 'Transacción no encontrada' });
      }

      const { transaction_type, amount, status, transaction_date, user_id, provider_id } = req.body;
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
  }
];

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
