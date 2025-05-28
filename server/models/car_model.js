const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CarModel = sequelize.define('CarModel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  doors: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  seats: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  additional_info: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON с техническими характеристиками'
  },
  brand: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  model: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1990,
      max: 2100
    }
  },
  fuel_consumption: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: true,
  },
}, {
  tableName: 'car_models',
  timestamps: true,
});

// Определение связей
CarModel.associate = function(models) {
  CarModel.hasMany(models.Car, {
    foreignKey: 'model_id',
    as: 'cars'
  });
};

module.exports = CarModel;