const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const models = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && 
      file !== 'index.js' && 
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    if (fs.existsSync(modelPath)) {
      const model = require(modelPath);
      models[model.name] = model;
    }
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
