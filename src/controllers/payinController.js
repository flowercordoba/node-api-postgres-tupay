const db = require('../models');
const { Op } = require('sequelize');
const Transaction = db.Transaction;
const Invoice = db.Invoice;

// Registrar el pago (payin)
exports.createPayin = async (req, res) => {
    const {
        reference,
        amount,
        currency,
        numdoc,
        username,
        userphone,
        useremail,
        method,
        provider_id,
        user_id,
        usertypeaccount
    } = req.body;

    try {
        // Crear la transacción de payin
        const transaction = await Transaction.create({
            transaction_type: 'payin',
            reference,
            amount,
            currency,
            numdoc,
            username,
            userphone,
            useremail,
            method,
            usertypeaccount,
            user_id, // Asignar el ID del usuario
            provider_id, // Asignar el ID del proveedor
            status: 'pending' // Iniciar como pendiente
        });

        // Crear la factura asociada
        const invoice = await Invoice.create({
            invoice_number: `INV-${transaction.id}`, // Generar el número de factura
            transaction_id: transaction.id,
            amount: transaction.amount,
            status: 'pending' // Inicialmente pendiente
        });

        res.status(201).json({
            message: 'Pago registrado y factura creada con éxito',
            transaction,
            invoice
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el pago', details: error.message });
    }
};

// Webhook para notificar que un pago ha sido confirmado por el proveedor
exports.webhookPaymentConfirmed = async (req, res) => {
    const { id } = req.body;
    console.log('Webhook received:', id);
    try {
        // Buscar la transacción por referencia
        const transaction = await Transaction.findOne({ where: { id } });
        console.log('Transaction found:', transaction);
        // Verificar si la transacción existe
        if (!transaction) {
            return res.status(404).json({ error: 'Transacción no encontrada' });
        }

        // Buscar la factura relacionada a la transacción
        const invoice = await Invoice.findOne({ where: { id} });

        // Verificar si la factura existe
        if (!invoice) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }

        // Actualizar el estado de la transacción y la factura a 'paid'
        transaction.status = 'paid';
        invoice.status = 'paid';
        await transaction.save();
        await invoice.save();

        res.status(200).json({ message: 'Estado de la transacción y factura actualizado a pagado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado de la transacción y factura', details: error.message });
    }
};

