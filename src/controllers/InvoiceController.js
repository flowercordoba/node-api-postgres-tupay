const db = require('../models');
const Invoice = db.Invoice;
const Transaction = db.Transaction;

// Crear una nueva factura
exports.createInvoice = async (req, res) => {
    try {
        const { invoice_number, transaction_id, amount, status } = req.body;

        // Verificar si la transacción existe
        const transaction = await Transaction.findByPk(transaction_id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transacción no encontrada' });
        }

        const invoice = await Invoice.create({
            invoice_number,
            transaction_id,
            amount,
            status,
        });
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ error: 'Error creando la factura', details: error.message });
    }
};

// Obtener todas las facturas
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.findAll();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo las facturas', details: error.message });
    }
};

// Obtener una factura por ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id);
        if (!invoice) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo la factura', details: error.message });
    }
};

// Actualizar una factura por ID
exports.updateInvoice = async (req, res) => {
    try {
        const { invoice_number, transaction_id, amount, status } = req.body;

        const invoice = await Invoice.findByPk(req.params.id);
        if (!invoice) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }

        // Verificar si la transacción existe
        const transaction = await Transaction.findByPk(transaction_id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transacción no encontrada' });
        }

        await invoice.update({
            invoice_number,
            transaction_id,
            amount,
            status,
        });
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando la factura', details: error.message });
    }
};

// Eliminar una factura por ID
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id);
        if (!invoice) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        await invoice.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando la factura', details: error.message });
    }
};
