const db = require('../models');
const Transaction = db.Transaction;
const Invoice = db.Invoice;

// Validar campos requeridos
const validateTransactionFields = (req, res, next) => {
  const requiredFields = ['transaction_type', 'amount', 'status', 'transaction_date', 'user_id', 'provider_id'];
  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length) {
    return res.status(400).json({ 
      error: 'Faltan campos requeridos', 
      missingFields 
    });
  }

  next();
};

// Función para generar un número de factura basado en el ID de la factura
const generateInvoiceNumber = async () => {
  const latestInvoice = await Invoice.findOne({
    order: [['id', 'DESC']],
  });

  const invoiceId = latestInvoice ? latestInvoice.id + 1 : 1; // Incrementar o comenzar desde 1
  return `INV-${invoiceId}`;
};

// Crear una nueva Transacción
exports.createTransaction = [
  validateTransactionFields,
  async (req, res) => {
    try {
      const { transaction_type, amount, status, transaction_date, user_id, provider_id, method } = req.body;

      // Crear la transacción
      const transaction = await Transaction.create({
        transaction_type,
        amount,
        status,
        transaction_date,
        user_id,
        provider_id,
      });

      // Solo crear la factura si se selecciona un método de pago específico
      if (method === 'invoice') {
        const invoice_number = await generateInvoiceNumber();

        const invoice = await Invoice.create({
          invoice_number, 
          transaction_id: transaction.id,
          amount: transaction.amount,
          status: 'pending',
        });

        // Agregar la factura a la respuesta si es necesario
        transaction.invoice = invoice;
      }

      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: 'Error creando la transacción', details: error.message });
    }
  }
];




exports.processPayment = async (req, res) => {
  try {
    const { transactionId, method } = req.body;

    // Verificar si la transacción existe
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }

    // Si el método de pago es válido, crear la factura
    if (method) {
      const invoice = await Invoice.create({
        invoiceNumber: `INV-${Date.now()}`, // Generar un número de factura
        transaction_id: transaction.id
      });

      res.status(201).json({
        message: 'Factura generada exitosamente',
        invoice
      });
    } else {
      res.status(400).json({ error: 'Método de pago no válido' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error procesando el pago', details: error.message });
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
