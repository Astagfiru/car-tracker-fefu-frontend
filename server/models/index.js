const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const models = {};

// Импортируем все модели из текущей директории
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // Игнорируем скрытые файлы
      file !== 'index.js' && // Игнорируем сам index.js
      file.slice(-3) === '.js' // Берем только .js файлы
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    models[model.name] = model;
  });

// Устанавливаем связи между моделями (если есть)
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;