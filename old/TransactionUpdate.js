// models/TransactionUpdate.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Transaction = require('./Transaction');

const TransactionUpdate = sequelize.define('TransactionUpdate', {
    new_status: {
        type: DataTypes.ENUM('approved', 'rejected'),
        allowNull: false,
    },
    update_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'transaction_updates',
    timestamps: false,
});

// Relación con Transaction
TransactionUpdate.belongsTo(Transaction, { foreignKey: 'transaction_id' });

module.exports = TransactionUpdate;
