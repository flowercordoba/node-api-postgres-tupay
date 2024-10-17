module.exports = (sequelize, DataTypes) => {
    const PendingReference = sequelize.define('PendingReference', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
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

    PendingReference.associate = (models) => {
        PendingReference.belongsTo(models.User, { foreignKey: 'user_id' });
        PendingReference.belongsTo(models.Provider, { foreignKey: 'provider_id' });
    };

    return PendingReference;
};
