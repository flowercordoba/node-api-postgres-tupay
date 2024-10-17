const { Sequelize } = require('sequelize');
const path = require('path');
const env = process.env.NODE_ENV || 'development';

// Cargar la configuración según el entorno
const config = require(path.join(__dirname, 'config.json'))[env];

// Determina si los logs deben estar habilitados
const LOGGING_ENABLED = process.env.LOGGING_ENABLED === 'true'; // Cambia esto para activar/desactivar logs
console.log('LOGGING_ENABLED:', LOGGING_ENABLED);

// Crear una instancia de Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: LOGGING_ENABLED ? (msg) => console.log(msg) : false, // Activa el logging si está habilitado
  });
}

// Exportar la instancia de Sequelize para usarla en los modelos
module.exports = sequelize;
