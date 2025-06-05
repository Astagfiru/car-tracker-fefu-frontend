const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const models = {};

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    try {
      const model = require(path.join(__dirname, file));
      if (model && model.name) {
        models[model.name] = model;
        console.log(`Loaded model: ${model.name}`);
      } else {
        console.warn(`Skipping file ${file}: not a valid Sequelize model`);
      }
    } catch (error) {
      console.error(`Error loading model from ${file}:`, error);
    }
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    try {
      models[modelName].associate(models);
      console.log(`Associations set for model: ${modelName}`);
    } catch (error) {
      console.error(`Error setting associations for ${modelName}:`, error);
    }
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;