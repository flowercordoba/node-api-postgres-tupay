// models/User.js
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
      },
      onboarding_date: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    }, {
      tableName: 'users',
      timestamps: true,
    });
  
    return User;
  };
  