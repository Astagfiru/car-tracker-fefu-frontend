const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  surname: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  patronymic: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
    unique: true,
    validate: {
      is: /^(\+7|8)\d{10}$/
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  position: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  tableName: 'employees',
  timestamps: true,
});

// Определение связей
Employee.associate = function(models) {
  Employee.hasMany(models.Request, {
    foreignKey: 'employee_id',
    as: 'requests'
  });
};

module.exports = Employee;