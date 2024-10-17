// models/Notification.js
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notification_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: 'notifications',
        timestamps: false,
    });

    // Relación con User y Transaction
    Notification.associate = (models) => {
        Notification.belongsTo(models.User, { foreignKey: 'user_id' });
        Notification.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
    };

    return Notification;
};
