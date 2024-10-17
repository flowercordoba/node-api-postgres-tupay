// models/PendingReference.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Provider = require('./Provider');

const PendingReference = sequelize.define('PendingReference', {
    status: {
        type: DataTypes.ENUM('pending', 'processed'),
        allowNull: false,
    },
    reference_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'pending_references',
    timestamps: false,
});

// Relación con User y Provider
PendingReference.belongsTo(User, { foreignKey: 'user_id' });
PendingReference.belongsTo(Provider, { foreignKey: 'provider_id' });

module.exports = PendingReference;
