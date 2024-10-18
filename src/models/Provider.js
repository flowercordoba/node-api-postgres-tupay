module.exports = (sequelize, DataTypes) => {
    const Provider = sequelize.define('Provider', {
        provider_id: {  // Asegúrate de que el campo 'provider_id' esté definido
            type: DataTypes.INTEGER,
            autoIncrement: true, // Si es autoincrementable
            primaryKey: true, // Defínelo como clave primaria
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact_email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        api_key: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, {
        tableName: 'providers',
        timestamps: false,
    });

    Provider.associate = (models) => {
        Provider.hasMany(models.Transaction, { as: 'transactions', foreignKey: 'provider_id' });
        Provider.hasMany(models.ApiKey, { as: 'apiKeys', foreignKey: 'provider_id' });
        Provider.hasMany(models.PendingReference, { as: 'pendingReferences', foreignKey: 'provider_id' });
        Provider.hasMany(models.GlobalUserTransaction, { as: 'globalTransactions', foreignKey: 'provider_id' });
    };

    return Provider;
};
