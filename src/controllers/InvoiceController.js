const db = require('../models');
const Transaction = db.Transaction;
const Invoice = db.Invoice;

// Crear una nueva Transacción
exports.createTransaction = async (req, res) => {
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
        if (method === 'invoice') { // Ajusta el método según tus necesidades
            const invoice = await Invoice.create({
                invoice_number: `INV-${transaction.id}`, // Puedes usar un formato diferente si lo deseas
                transaction_id: transaction.id,
                amount: transaction.amount,
                status: 'pending', // o el estado que necesites
            });

            // Agregar la factura a la respuesta si es necesario
            transaction.invoice = invoice;
        }

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Error creando la transacción', details: error.message });
    }
};
