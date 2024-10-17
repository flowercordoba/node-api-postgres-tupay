// models/ApiKey.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');
const Provider = require('./Provider');

const ApiKey = sequelize.define('ApiKey', {
    api_key: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'api_keys',
    timestamps: false,
});

// Relación con Provider
ApiKey.belongsTo(Provider, { foreignKey: 'provider_id' });

module.exports = ApiKey;
