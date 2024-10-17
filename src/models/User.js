const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validación de formato de email
      }
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
      type: DataTypes.ENUM('user', 'admin'), // Campo para roles
      defaultValue: 'user',
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'), // Campo para el estado del usuario
      defaultValue: 'active',
    }
  }, {
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          // Hash de la contraseña antes de guardarla
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          // Hash de la contraseña antes de actualizarla
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
    // Otras asociaciones que desees agregar
  };

  return User;
};
