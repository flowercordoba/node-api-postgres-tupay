// models/ApiKey.js
module.exports = (sequelize, DataTypes) => {
  const ApiKey = sequelize.define('ApiKey', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    tableName: 'api_keys',
    timestamps: false,
  });

  // Relación con el modelo Provider
  ApiKey.associate = (models) => {
    ApiKey.belongsTo(models.Provider, { foreignKey: 'provider_id' });
  };

  return ApiKey;
};
