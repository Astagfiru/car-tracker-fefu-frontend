const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clients',
      key: 'id'
    }
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'employees',
      key: 'id'
    }
  },
  car_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cars',
      key: 'id'
    }
  },
  application_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      isIn: [['new', 'in_progress', 'completed', 'canceled']]
    }
  },
}, {
  tableName: 'applications',
  timestamps: true,
});

// Определение связей
Application.associate = function(models) {
  Application.belongsTo(models.Client, {
    foreignKey: 'client_id',
    as: 'client'
  });
  Application.belongsTo(models.Employee, {
    foreignKey: 'employee_id',
    as: 'employee'
  });
  Application.belongsTo(models.Car, {
    foreignKey: 'car_id',
    as: 'car'
  });
  Application.hasOne(models.Contract, {
    foreignKey: 'id',
    as: 'contract'
  });
};

module.exports = Application;