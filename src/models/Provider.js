module.exports = (sequelize, DataTypes) => {
    const Provider = sequelize.define('Provider', {
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
    };

    return Provider;
};
