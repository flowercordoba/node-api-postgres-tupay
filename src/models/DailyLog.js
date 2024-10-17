// models/DailyLog.js
module.exports = (sequelize, DataTypes) => {
    const DailyLog = sequelize.define('DailyLog', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      log_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    }, {
      tableName: 'daily_logs',
      timestamps: false,
    });
  
    // Relación con Transaction
    DailyLog.associate = (models) => {
      DailyLog.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
    };
  
    return DailyLog;
  };
  