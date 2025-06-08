
  const { DataTypes } = require('sequelize');
  const sequelize = require('../config/db');

  const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    middle_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: true,
      validate: {
        is: /^(\+7|8)\d{10}$/,
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    position: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  }, {
    tableName: 'employees',
    timestamps: true,
  });

  Employee.associate = function(models) {
    Employee.hasMany(models.Application, {
      foreignKey: 'employee_id',
      as: 'applications',
    });
    Employee.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  module.exports = Employee;
