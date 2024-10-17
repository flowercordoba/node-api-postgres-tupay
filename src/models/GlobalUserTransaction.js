module.exports = (sequelize, DataTypes) => {
    const GlobalUserTransaction = sequelize.define('GlobalUserTransaction', {
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
        executed_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: 'global_user_transactions',
        timestamps: false,
    });

    GlobalUserTransaction.associate = (models) => {
        GlobalUserTransaction.belongsTo(models.User, { foreignKey: 'user_id' });
        GlobalUserTransaction.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
        GlobalUserTransaction.belongsTo(models.Provider, { foreignKey: 'provider_id' });
    };

    return GlobalUserTransaction;
};
