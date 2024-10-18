// models/invoice.js
module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define('Invoice', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        invoice_number: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        transaction_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'transactions', // Nombre de la tabla a la que se hace referencia
                key: 'transaction_id',
            },
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'paid', 'canceled'),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'invoices',
        timestamps: false, // Si no necesitas createdAt/updatedAt
    });

    Invoice.associate = (models) => {
        Invoice.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
    };

    return Invoice;
};
