const { Sequelize } = require('sequelize');
const path = require('path');
const env = process.env.NODE_ENV || 'development';

// Cargar la configuración según el entorno
const config = require(path.join(__dirname, 'config.json'))[env];

// Crear una instancia de Sequelize con SSL habilitado
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: config.logging || false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Si no necesitas verificar el certificado SSL
    }
  }
});

// Exportar la instancia de Sequelize
module.exports = sequelize;
