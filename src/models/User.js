const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {  // Mantén 'user_id' como clave primaria
      type: DataTypes.INTEGER,
      autoIncrement: true, // Es autoincrementable
      primaryKey: true,    // Definido como clave primaria
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    onboarding_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    }
  }, {
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  });

  // Definir asociaciones (relaciones) con otros modelos
  User.associate = (models) => {
    User.hasMany(models.Transaction, { as: 'transactions', foreignKey: 'user_id' });
    User.hasMany(models.PendingReference, { as: 'pendingReferences', foreignKey: 'user_id' });
    User.hasMany(models.GlobalUserTransaction, { as: 'globalTransactions', foreignKey: 'user_id' });
  };

  return User;
};
