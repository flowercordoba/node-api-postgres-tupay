const crypto = require('crypto');

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
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    issueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      defaultValue: () => crypto.randomUUID(), // Generar referencia única
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numdoc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userphone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    typetransaction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bankAgreementNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentReceipt: {
      type: DataTypes.STRING,  // Ruta al archivo guardado
      allowNull: true,
    }
  }, {
    tableName: 'transactions',
    timestamps: true,
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
    Transaction.belongsTo(models.Provider, { foreignKey: 'provider_id' });
  };

  return Transaction;
};
