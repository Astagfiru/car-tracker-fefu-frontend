const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Car = sequelize.define('Car', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  model_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'car_model',
      key: 'id'
    }
  },
  in_stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  vin: {
    type: DataTypes.CHAR(17),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  mileage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0.01
    }
  },
}, {
  tableName: 'cars',
  timestamps: true,
});

// Определение связей
Car.associate = function(models) {
  Car.belongsTo(models.CarModel, {
    foreignKey: 'model_id',
    as: 'model'
  });
  Car.hasMany(models.Application, {
    foreignKey: 'car_id',
    as: 'applications'
  });
};

module.exports = Car;