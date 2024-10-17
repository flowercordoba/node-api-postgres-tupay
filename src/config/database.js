// src/config/database.js
const { Sequelize } = require('sequelize');
const path = require('path');
const env = process.env.NODE_ENV || 'development';

// Cargar la configuración según el entorno
const config = require(path.join(__dirname, 'config.json'))[env];

// Crear una instancia de Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging || false, // Opción para desactivar los logs de SQL
  });
}

// Exportar la instancia de Sequelize para usarla en los modelos
module.exports = sequelize;
