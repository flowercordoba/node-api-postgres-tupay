module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    transaction_type: {
      type: DataTypes.ENUM('payin', 'payout'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50), // Aumenta según lo necesario
      allowNull: false,
    },
    usertypeaccount: {
      type: DataTypes.ENUM('checking', 'savings'), // Asegúrate de incluir los valores permitidos
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'paid'),
      allowNull: false,
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    transaction_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    reference: {
      type: DataTypes.STRING(36), // Asegúrate que el tamaño sea suficiente
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3), // Asegúrate que sea suficiente para el código de moneda
      allowNull: false,
    },
    numdoc: {
      type: DataTypes.STRING(20), // Asegúrate de que coincida
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50), // Aumenta según lo necesario
      allowNull: false,
    },
    userphone: {
      type: DataTypes.STRING(20), // Ajusta según lo necesario
      allowNull: false,
    },
    useremail: {
      type: DataTypes.STRING(50), // Ajusta según lo necesario
      allowNull: false,
    },
    userbank: {
      type: DataTypes.STRING(50), // Ajusta según lo necesario
      allowNull: false,
    },
    usernumaccount: {
      type: DataTypes.STRING(20), // Ajusta según lo necesario
      allowNull: false,
    },
    typetransaction: {
      type: DataTypes.STRING(10), // Ajusta según lo necesario
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING(20), // Ajusta según lo necesario
      allowNull: false,
    },
    bankAgreementNumber: {
      type: DataTypes.STRING(20), // Ajusta según lo necesario
      allowNull: true,
    },
    accountNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,  // Permitir nulos
    },

    paymentReceipt: {
      type: DataTypes.STRING(255), // Ajusta según lo necesario
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    issueDate: {
      type: DataTypes.DATE,
      allowNull: true, // Permitir nulos
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true, // Permitir nulos
    },
  }, {
    tableName: 'transactions',
    timestamps: true, // Esto activará automáticamente createdAt y updatedAt
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
    Transaction.belongsTo(models.Provider, { foreignKey: 'provider_id' });
    Transaction.hasOne(models.Invoice, { foreignKey: 'transaction_id' });
  };

  return Transaction;
};
