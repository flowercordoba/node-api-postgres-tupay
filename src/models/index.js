'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Cargar la configuración de la base de datos
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db = {};

// Crear la instancia de Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
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
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Configurar las asociaciones entre modelos
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exportar sequelize y los modelos
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


