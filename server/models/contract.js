const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contract = sequelize.define('Contract', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  application_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'applications',
      key: 'id'
    }
  },
  signing_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  contract_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0.01
    }
  },
}, {
  tableName: 'contracts',
  timestamps: true,
});

// Определение связей
Contract.associate = function(models) {
  Contract.belongsTo(models.Application, {
    foreignKey: 'application_id',
    as: 'application'
  });
};

module.exports = Contract;