// models/Provider.js
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

    // Puedes agregar relaciones aquí si en el futuro lo necesitas
    Provider.associate = (models) => {
        // Ejemplo de cómo relacionar si es necesario
        // Provider.hasMany(models.ApiKey, { foreignKey: 'provider_id' });
    };

    return Provider;
};
