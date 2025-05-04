const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Request = sequelize.define('Request', {
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
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      isIn: [['НОВАЯ', 'В РАБОТЕ', 'ЗАВЕРШЕНА', 'ОТМЕНЕНА']]
    }
  },
}, {
  tableName: 'requests',
  timestamps: true,
});

// Определение связей
Request.associate = function(models) {
  Request.belongsTo(models.Client, {
    foreignKey: 'client_id',
    as: 'client'
  });
  Request.belongsTo(models.Employee, {
    foreignKey: 'employee_id',
    as: 'employee'
  });
  Request.belongsTo(models.Car, {
    foreignKey: 'car_id',
    as: 'car'
  });
  Request.hasOne(models.Contract, {
    foreignKey: 'request_id',
    as: 'contract'
  });
};

module.exports = Request;