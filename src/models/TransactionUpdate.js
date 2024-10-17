// models/TransactionUpdate.js
module.exports = (sequelize, DataTypes) => {
    const TransactionUpdate = sequelize.define('TransactionUpdate', {
        new_status: {
            type: DataTypes.ENUM('approved', 'rejected'),
            allowNull: false,
        },
        update_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: 'transaction_updates',
        timestamps: false,
    });

    // Relación con Transaction
    TransactionUpdate.associate = (models) => {
        TransactionUpdate.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
    };

    return TransactionUpdate;
};
