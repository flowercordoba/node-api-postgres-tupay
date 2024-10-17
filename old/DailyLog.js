// models/DailyLog.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');
const Transaction = require('./Transaction');

const DailyLog = sequelize.define('DailyLog', {
    log_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    details: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'daily_logs',
    timestamps: false,
});

// Relación con Transaction
DailyLog.belongsTo(Transaction, { foreignKey: 'transaction_id' });

module.exports = DailyLog;
