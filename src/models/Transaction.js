// models/Transaction.js
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      transaction_type: {
        type: DataTypes.ENUM('payin', 'payout'),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
      },
      transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    }, {
      tableName: 'transactions',
      timestamps: true,
    });
  
    // Relación con el modelo User y Provider
    Transaction.associate = (models) => {
      Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
      Transaction.belongsTo(models.Provider, { foreignKey: 'provider_id' });
    };
  
    return Transaction;
  };
  