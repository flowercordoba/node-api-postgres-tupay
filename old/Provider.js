// models/Provider.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Provider = sequelize.define('Provider', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact_email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
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
    tableName: 'providers',
    timestamps: false,
});

module.exports = Provider;
