const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  level_of_access: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  name: {
    type: DataTypes.STRING(25),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 25],
    },
  },
}, {
  tableName: 'roles',
  timestamps: true,
});

Role.associate = function(models) {
  // Одна роль может быть у нескольких пользователей
  Role.hasMany(models.User, {
    foreignKey: 'role_id',
    as: 'users',
  });
};

module.exports = Role;