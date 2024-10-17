// models/Transaction.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Provider = require('./Provider');

const Transaction = sequelize.define('Transaction', {
    transaction_type: {
        type: DataTypes.ENUM('payin', 'payout'),
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
    },
    transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'transactions',
    timestamps: true,
});

// Relación con el modelo User y Provider
Transaction.belongsTo(User, { foreignKey: 'user_id' });
Transaction.belongsTo(Provider, { foreignKey: 'provider_id' });

module.exports = Transaction;
