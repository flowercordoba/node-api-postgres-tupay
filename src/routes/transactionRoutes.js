const express = require('express');
const { Transaction } = require('../models');
const router = express.Router();

// Obtener todas las transacciones
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
