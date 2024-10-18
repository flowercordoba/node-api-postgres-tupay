module.exports = (sequelize, DataTypes) => {
    const Provider = sequelize.define('Provider', {
        provider_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        },
        country: {
            type: DataTypes.STRING(2), // Se espera un código de país ISO 3166-1 alpha-2
            allowNull: true, // Cambiar a true temporalmente
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
