// models/GlobalUserTransaction.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');
const User = require('../src/models/User');
const Transaction = require('./Transaction');
const Provider = require('./Provider');

const GlobalUserTransaction = sequelize.define('GlobalUserTransaction', {
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
    executed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'global_user_transactions',
    timestamps: false,
});

// Relación con User, Transaction y Provider
GlobalUserTransaction.belongsTo(User, { foreignKey: 'user_id' });
GlobalUserTransaction.belongsTo(Transaction, { foreignKey: 'transaction_id' });
GlobalUserTransaction.belongsTo(Provider, { foreignKey: 'provider_id' });

module.exports = GlobalUserTransaction;
