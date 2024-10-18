// controllers/InterbancoController.js

const db = require('../models');
const Transaction = db.Transaction;

// Consultar referencia
exports.getProvidersForReference = async (req, res) => {
    const { referencia } = req.params;

    try {
        const transaction = await Transaction.findOne({ where: { reference: referencia } });
        if (!transaction) {
            return res.status(404).json({ message: 'Transacción no encontrada' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar referencia', error });
    }
};

// Aprobar referencia
exports.approveReference = async (req, res) => {
    const { ref } = req.body;

    try {
        const transaction = await Transaction.findOne({ where: { reference: ref } });
        if (!transaction) {
            return res.status(404).json({ message: 'Transacción no encontrada' });
        }
        
        // Aquí puedes agregar la lógica para actualizar la transacción o realizar una acción específica

        res.status(200).json({ message: 'Referencia aprobada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al aprobar referencia', error });
    }
};
