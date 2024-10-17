const { Op } = require('sequelize');
const Transaction = require('../models/Transaction');
const Provider = require('../models/Provider');

// Mostrar los proveedores disponibles para una transacción por referencia
exports.getProvidersForReference = async (req, res) => {
    const { reference } = req.params;

    try {
        // Verificar si la transacción existe
        const transaction = await Transaction.findOne({ where: { reference } });
        if (!transaction) {
            return res.status(404).json({ message: 'Transacción no encontrada' });
        }

        // Obtener los proveedores disponibles
        const providers = await Provider.findAll();
        res.status(200).json({ providers });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proveedores', error });
    }
};

// Enviar la referencia de pago al proveedor seleccionado
exports.sendReferenceToProvider = async (req, res) => {
    const { reference, providerId } = req.body;

    try {
        // Verificar si la transacción existe
        const transaction = await Transaction.findOne({ where: { reference } });
        if (!transaction) {
            return res.status(404).json({ message: 'Transacción no encontrada' });
        }

        // Verificar si el proveedor existe
        const provider = await Provider.findOne({ where: { id: providerId } });
        if (!provider) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        // Aquí redirigirías al usuario a la web del proveedor con su referencia y userId
        res.status(200).json({
            message: 'Proveedor seleccionado correctamente',
            redirectUrl: `${provider.paymentUrl}?userId=${transaction.user_id}&reference=${transaction.reference}`
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al seleccionar proveedor', error });
    }
};

// Webhook donde el proveedor notifica que el usuario pagó
exports.paymentNotification = async (req, res) => {
    const { reference } = req.body;

    try {
        // Verificar si la transacción existe
        const transaction = await Transaction.findOne({ where: { reference } });
        if (!transaction) {
            return res.status(404).json({ message: 'Transacción no encontrada' });
        }

        // Actualizar el estado de la transacción a "completed"
        transaction.status = 'completed';
        await transaction.save();

        res.status(200).json({ message: 'Pago recibido y transacción actualizada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado de la transacción', error });
    }
};

// Permitir al proveedor consultar los detalles de una transacción por referencia
exports.getTransactionDetails = async (req, res) => {
    const { reference } = req.params;

    try {
        const transaction = await Transaction.findOne({ where: { reference }, include: ['User', 'Provider'] });
        if (!transaction) {
            return res.status(404).json({ message: 'Transacción no encontrada' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los detalles de la transacción', error });
    }
};
