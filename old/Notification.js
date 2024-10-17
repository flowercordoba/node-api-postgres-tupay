// models/Notification.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Transaction = require('./Transaction');

const Notification = sequelize.define('Notification', {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    notification_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'notifications',
    timestamps: false,
});

// Relación con User y Transaction
Notification.belongsTo(User, { foreignKey: 'user_id' });
Notification.belongsTo(Transaction, { foreignKey: 'transaction_id' });

module.exports = Notification;
