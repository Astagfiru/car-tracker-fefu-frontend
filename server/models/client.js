const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  middle_name: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
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
    },
  },
  passport_series: {
    type: DataTypes.CHAR(4),
    allowNull: false,
    validate: {
      is: /^\d{4}$/
    }
  },
  passport_number: {
    type: DataTypes.CHAR(6),
    allowNull: false,
    validate: {
      is: /^\d{6}$/
    }
  },
  issued_by: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  issue_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isDate: true
    }
  },
}, {
  tableName: 'clients',
  timestamps: true,
});

// Определение связей
Client.associate = function(models) {
  Client.hasMany(models.Application, {
    foreignKey: 'client_id',
    as: 'requests'
  });
};

module.exports = Client;