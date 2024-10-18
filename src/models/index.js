'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize'); // Cambia esto a desestructuración para ser más claro
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Cargar la configuración de la base de datos
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db = {};

// Determina si el logging debe estar habilitado
const LOGGING_ENABLED = process.env.LOGGING_ENABLED === 'true'; // Cambia esto para activar/desactivar logs
console.log('LOGGING_ENABLED:', LOGGING_ENABLED);

// Crear la instancia de Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config, // Usa la configuración existente
    logging: LOGGING_ENABLED ? (msg) => console.log(msg) : false, // Activa el logging si está habilitado
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config, // Usa la configuración existente
    logging: LOGGING_ENABLED ? (msg) => console.log(msg) : false, // Activa el logging si está habilitado
  });
}

// Leer todos los modelos y agregarlos al objeto "db"
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' && // Filtrar archivos .js
      file.indexOf('.test.js') === -1 // Excluir archivos de prueba
    );
  })
  .forEach(file => {
    console.log("file", file)
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Configurar las asociaciones entre modelos
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sincronizar los modelos con la base de datos, actualizando las columnas pero sin eliminar datos
sequelize.sync({
  alter: {
    drop: false // No eliminar columnas que tienen dependencias
  }
})
  .then(() => {
    console.log('Modelos sincronizados correctamente.');
  })
  .catch((error) => {
    console.error('Error sincronizando los modelos:', error);
  });

// Exportar sequelize y los modelos
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
