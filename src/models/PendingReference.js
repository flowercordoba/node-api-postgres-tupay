// models/PendingReference.js
module.exports = (sequelize, DataTypes) => {
    const PendingReference = sequelize.define('PendingReference', {
        status: {
            type: DataTypes.ENUM('pending', 'processed'),
            allowNull: false,
        },
        reference_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: 'pending_references',
        timestamps: false,
    });

    // Relación con User y Provider
    PendingReference.associate = (models) => {
        PendingReference.belongsTo(models.User, { foreignKey: 'user_id' });
        PendingReference.belongsTo(models.Provider, { foreignKey: 'provider_id' });
    };

    return PendingReference;
};
